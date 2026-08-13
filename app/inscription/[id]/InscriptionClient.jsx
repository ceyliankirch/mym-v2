"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  Send,
  AlertCircle,
  Plus,
  CheckCircle2,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useSession } from "next-auth/react";
import { creerInscription } from "@/app/actions/inscriptions";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

export default function InscriptionClient({ sejour, enfants = [] }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedEnfantId, setSelectedEnfantId] = useState("");
  const [showNewEnfantForm, setShowNewEnfantForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  let formFields = [];
  try {
    formFields = sejour.formSchema ? JSON.parse(sejour.formSchema) : [];
  } catch (e) {
    console.error("Erreur de lecture du formulaire", e);
  }

  const [formData, setFormData] = useState({});
  const [newEnfantData, setNewEnfantData] = useState({
    prenom: "",
    nom: "",
    dateNaissance: "",
    sexe: "",
    taille: "",
    poids: "",
    pointure: "",
    allergies: "",
    informationsComplementaires: "",
  });

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  // 💶 Détecte si la famille a souscrit à l'assurance annulation (champ "select"
  // dont le libellé évoque l'assurance) pour ajouter les 30€ au prix affiché.
  const champAssurance = formFields.find(
    (f) => f.type === "select" && f.label?.toLowerCase().includes("assurance")
  );
  const assuranceSouscrite = champAssurance && formData[champAssurance.label] === "Oui";

  const handleNewEnfantChange = (key, value) => {
    setNewEnfantData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!selectedEnfantId && !showNewEnfantForm) {
        setError("Veuillez sélectionner ou créer un enfant");
        setIsSubmitting(false);
        return;
      }

      const enfantData = showNewEnfantForm
        ? newEnfantData
        : { id: selectedEnfantId };

      if (!showNewEnfantForm) {
        const selectedEnfant = enfants.find((e) => e.id === selectedEnfantId);
        if (!selectedEnfant) {
          setError("Enfant sélectionné introuvable");
          setIsSubmitting(false);
          return;
        }
      }

      const result = await creerInscription(
        sejour.id,
        enfantData,
        session.user.id
      );

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        if (sejour.lienPaiementCIC) {
          setTimeout(() => {
            window.location.href = sejour.lienPaiementCIC;
          }, 2500);
        } else {
          setTimeout(() => {
            router.push("/espace-famille?tab=documents");
          }, 2000);
        }
      }
    } catch (err) {
      setError("Une erreur est survenue");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div
            style={{
              background: C.white,
              borderRadius: "32px",
              padding: "60px 40px",
              boxShadow: "0 10px 40px rgba(17,76,90,0.05)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#d1fae5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircle2 size={48} color="#10b981" />
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, color: C.teal }}>
              Inscription envoyée ! 🎉
            </h1>
            {sejour.lienPaiementCIC ? (
              <>
                <p style={{ color: C.gray, marginTop: "16px", fontSize: "16px" }}>
                  Vous allez être redirigé vers la page de paiement pour régler le séjour...
                </p>
                <a
                  href={sejour.lienPaiementCIC}
                  style={{ display: "inline-block", marginTop: "24px", background: C.yellow, color: C.teal, padding: "14px 28px", borderRadius: "999px", fontWeight: 800, textDecoration: "none", fontSize: "14px" }}
                >
                  Accéder au paiement maintenant
                </a>
              </>
            ) : (
              <p style={{ color: C.gray, marginTop: "16px", fontSize: "16px" }}>
                Redirection vers votre espace famille...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link
          href={`/sejours-enfants-ados/${sejour.id}`}
          style={styles.backLink}
        >
          <ArrowLeft size={16} /> Retour au séjour
        </Link>

        <div style={styles.card}>
          <h1 style={styles.title}>Inscription : {sejour.titre}</h1>
          <p style={styles.subtitle}>
            Veuillez remplir les informations ci-dessous pour finaliser la
            demande d'inscription.
          </p>

          {status === "loading" ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner} />
              <p style={styles.loadingText}>
                Vérification de votre compte...
              </p>
            </div>
          ) : !isLoggedIn ? (
            <div style={styles.authRequired}>
              <div style={styles.lockIcon}>
                <Lock size={28} color={C.saffron} />
              </div>
              <h3 style={styles.authTitle}>Connexion requise</h3>
              <p style={styles.authText}>
                Pour des raisons de sécurité et pour le suivi du dossier de
                votre enfant, vous devez posséder un compte Parent pour
                accéder à ce formulaire.
              </p>
              <div style={styles.authButtons}>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  style={{ ...styles.button, background: C.teal, color: C.yellow }}
                >
                  Se connecter
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  style={{ ...styles.button, background: C.white, border: `2px solid ${C.teal}`, color: C.teal }}
                >
                  Créer un compte
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              {error && (
                <div style={styles.errorAlert}>
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Sélection de l'enfant</h3>
                {!showNewEnfantForm ? (
                  <>
                    {enfants.length > 0 && (
                      <select
                        value={selectedEnfantId}
                        onChange={(e) => setSelectedEnfantId(e.target.value)}
                        style={styles.select}
                      >
                        <option value="">-- Sélectionner un enfant --</option>
                        {enfants.map((enfant) => (
                          <option key={enfant.id} value={enfant.id}>
                            {enfant.prenom} {enfant.nom}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowNewEnfantForm(true)}
                      style={styles.addButton}
                    >
                      <Plus size={16} /> Ajouter un nouvel enfant
                    </button>
                  </>
                ) : (
                  <>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Prénom *</label>
                      <input
                        type="text"
                        value={newEnfantData.prenom}
                        onChange={(e) =>
                          handleNewEnfantChange("prenom", e.target.value)
                        }
                        required
                        style={styles.input}
                        placeholder="Prénom de l'enfant"
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Nom *</label>
                      <input
                        type="text"
                        value={newEnfantData.nom}
                        onChange={(e) =>
                          handleNewEnfantChange("nom", e.target.value)
                        }
                        required
                        style={styles.input}
                        placeholder="Nom de l'enfant"
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Date de naissance</label>
                      <input
                        type="date"
                        value={newEnfantData.dateNaissance}
                        onChange={(e) =>
                          handleNewEnfantChange("dateNaissance", e.target.value)
                        }
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Sexe</label>
                      <select
                        value={newEnfantData.sexe}
                        onChange={(e) => handleNewEnfantChange("sexe", e.target.value)}
                        style={styles.select}
                      >
                        <option value="">-- Sélectionner --</option>
                        <option value="M">Garçon</option>
                        <option value="F">Fille</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <div style={{ ...styles.inputGroup, flex: 1 }}>
                        <label style={styles.label}>Taille (cm)</label>
                        <input
                          type="number"
                          min="0"
                          value={newEnfantData.taille}
                          onChange={(e) => handleNewEnfantChange("taille", e.target.value)}
                          style={styles.input}
                          placeholder="ex: 140"
                        />
                      </div>
                      <div style={{ ...styles.inputGroup, flex: 1 }}>
                        <label style={styles.label}>Poids (kg)</label>
                        <input
                          type="number"
                          min="0"
                          value={newEnfantData.poids}
                          onChange={(e) => handleNewEnfantChange("poids", e.target.value)}
                          style={styles.input}
                          placeholder="ex: 35"
                        />
                      </div>
                      <div style={{ ...styles.inputGroup, flex: 1 }}>
                        <label style={styles.label}>Pointure</label>
                        <input
                          type="number"
                          min="0"
                          value={newEnfantData.pointure}
                          onChange={(e) => handleNewEnfantChange("pointure", e.target.value)}
                          style={styles.input}
                          placeholder="ex: 34"
                        />
                      </div>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Allergies ou intolérances</label>
                      <textarea
                        value={newEnfantData.allergies}
                        onChange={(e) => handleNewEnfantChange("allergies", e.target.value)}
                        rows="3"
                        style={styles.input}
                        placeholder="ex: Allergie aux arachides, intolérance au lactose..."
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Informations complémentaires</label>
                      <textarea
                        value={newEnfantData.informationsComplementaires}
                        onChange={(e) => handleNewEnfantChange("informationsComplementaires", e.target.value)}
                        rows="3"
                        style={styles.input}
                        placeholder="Toute information utile à l'équipe encadrante..."
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNewEnfantForm(false)}
                      style={styles.cancelButton}
                    >
                      Annuler
                    </button>
                  </>
                )}
              </div>

              {formFields.length > 0 && (
                <>
                  <div style={styles.divider} />
                  <div style={styles.section}>
                    {formFields.map((field) => {
                      if (field.type === "section") {
                        return (
                          <h3 key={field.id} style={styles.sectionTitle}>
                            {field.label}
                          </h3>
                        );
                      }

                      if (field.type === "info") {
                        return (
                          <p key={field.id} style={styles.infoText}>
                            {field.label}
                          </p>
                        );
                      }

                      if (field.type === "checkbox") {
                        return (
                          <label key={field.id} style={styles.checkboxRow}>
                            <input
                              type="checkbox"
                              required={field.required}
                              onChange={(e) =>
                                handleChange(field.label, e.target.checked)
                              }
                              style={styles.checkboxInput}
                            />
                            <span>
                              {field.label}
                              {field.required && (
                                <span style={{ color: "#ef4444" }}> *</span>
                              )}
                            </span>
                          </label>
                        );
                      }

                      return (
                        <div key={field.id} style={styles.inputGroup}>
                          <label style={styles.label}>
                            {field.label}
                            {field.required && (
                              <span style={{ color: "#ef4444" }}>*</span>
                            )}
                          </label>

                          {field.type === "textarea" ? (
                            <textarea
                              required={field.required}
                              onChange={(e) =>
                                handleChange(field.label, e.target.value)
                              }
                              rows="4"
                              style={styles.input}
                            />
                          ) : field.type === "select" ? (
                            <select
                              required={field.required}
                              onChange={(e) =>
                                handleChange(field.label, e.target.value)
                              }
                              style={styles.input}
                            >
                              <option value="">Sélectionnez une option</option>
                              {field.options?.split(",").map((opt, i) => (
                                <option key={i} value={opt.trim()}>
                                  {opt.trim()}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              required={field.required}
                              onChange={(e) =>
                                handleChange(field.label, e.target.value)
                              }
                              style={styles.input}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <div style={styles.buttonContainer}>
                {sejour.prix > 0 && (
                  <div style={styles.priceSummary}>
                    <div style={styles.priceRow}>
                      <span>Prix du séjour</span>
                      <span>{sejour.prix.toFixed(2)} €</span>
                    </div>
                    {assuranceSouscrite && (
                      <div style={styles.priceRow}>
                        <span>Assurance annulation (MAIF)</span>
                        <span>+ 30,00 €</span>
                      </div>
                    )}
                    <div style={styles.priceTotalRow}>
                      <span>Total</span>
                      <span>{(sejour.prix + (assuranceSouscrite ? 30 : 0)).toFixed(2)} €</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.submitButton,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? "Envoi en cours..." : "Valider l'inscription"}
                  <Send size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: C.arctic,
    fontFamily: "'Montserrat', sans-serif",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: C.teal,
    fontWeight: 700,
    fontSize: "14px",
    textDecoration: "none",
    marginBottom: "32px",
  },
  card: {
    background: C.white,
    borderRadius: "32px",
    padding: "40px",
    boxShadow: "0 10px 40px rgba(17,76,90,0.05)",
  },
  title: {
    fontSize: "28px",
    fontWeight: 900,
    color: C.teal,
    marginBottom: "8px",
    lineHeight: 1.2,
  },
  subtitle: {
    color: C.gray,
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "32px",
  },
  loadingContainer: {
    padding: "40px",
    textAlign: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: C.yellow,
    animation: "pulse 1.5s infinite",
    margin: "0 auto",
  },
  loadingText: {
    marginTop: "16px",
    color: C.teal,
    fontWeight: 600,
  },
  authRequired: {
    background: "#f8fafc",
    border: `1px solid ${C.lightGray}`,
    borderRadius: "24px",
    padding: "40px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  lockIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: `${C.yellow}20`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  authTitle: {
    fontSize: "20px",
    fontWeight: 800,
    color: C.teal,
    marginBottom: "12px",
  },
  authText: {
    color: C.gray,
    fontSize: "14px",
    lineHeight: 1.6,
    maxWidth: "400px",
    marginBottom: "24px",
  },
  authButtons: {
    display: "flex",
    gap: "12px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  errorAlert: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
    padding: "16px",
    borderRadius: "12px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 900,
    color: C.teal,
    borderBottom: `2px solid ${C.arctic}`,
    paddingBottom: "8px",
    marginTop: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 700,
    color: C.teal,
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: `1px solid ${C.lightGray}`,
    background: "#f8fafc",
    fontFamily: "inherit",
    fontSize: "14px",
  },
  select: {
    padding: "14px",
    borderRadius: "12px",
    border: `1px solid ${C.lightGray}`,
    background: "#f8fafc",
    fontFamily: "inherit",
    fontSize: "14px",
  },
  addButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: C.arctic,
    border: "none",
    color: C.teal,
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px",
  },
  cancelButton: {
    background: "transparent",
    border: `1px solid ${C.lightGray}`,
    color: C.teal,
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
  },
  divider: {
    borderTop: `1px solid ${C.arctic}`,
  },
  infoText: {
    fontSize: "13px",
    lineHeight: 1.7,
    color: C.gray,
    background: C.arctic,
    borderRadius: "12px",
    padding: "14px 16px",
    whiteSpace: "pre-line",
    margin: 0,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "13px",
    lineHeight: 1.5,
    color: C.teal,
    fontWeight: 600,
    cursor: "pointer",
  },
  checkboxInput: {
    marginTop: "3px",
    width: "16px",
    height: "16px",
    flexShrink: 0,
    cursor: "pointer",
  },
  priceSummary: {
    background: C.arctic,
    borderRadius: "16px",
    padding: "16px 20px",
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    fontWeight: 600,
    color: C.gray,
  },
  priceTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: 900,
    color: C.teal,
    paddingTop: "8px",
    borderTop: `1px solid ${C.lightGray}`,
  },
  buttonContainer: {
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: `1px solid ${C.arctic}`,
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    background: C.yellow,
    color: C.teal,
    padding: "18px",
    borderRadius: "16px",
    border: "none",
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
