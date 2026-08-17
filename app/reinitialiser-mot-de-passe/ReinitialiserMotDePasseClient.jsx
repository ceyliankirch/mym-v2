"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { reinitialiserMotDePasse } from "@/app/actions/auth";

const C = {
  yellow: "#FFC801",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
  red: "#ef4444",
};

function ReinitialiserMotDePasseForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await reinitialiserMotDePasse(token, password);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/"), 2500);
      }
    } catch (err) {
      setError("Une erreur est survenue.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div style={styles.card}>
        <AlertCircle size={40} color={C.red} />
        <h1 style={styles.title}>Lien invalide</h1>
        <p style={styles.text}>Ce lien de réinitialisation est incomplet. Merci de refaire une demande depuis la page de connexion.</p>
        <Link href="/" style={styles.link}>Retour à l'accueil</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div style={styles.card}>
        <CheckCircle2 size={40} color="#10b981" />
        <h1 style={styles.title}>Mot de passe mis à jour !</h1>
        <p style={styles.text}>Vous allez être redirigé vers l'accueil pour vous connecter...</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Réinitialiser mon mot de passe</h1>
      <p style={styles.text}>Choisissez un nouveau mot de passe pour votre compte.</p>

      {error && (
        <div style={styles.errorBox}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrap}>
          <Lock size={18} color={C.gray} style={styles.inputIcon} />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrap}>
          <Lock size={18} color={C.gray} style={styles.inputIcon} />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirmer le mot de passe"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" disabled={isSubmitting} style={{ ...styles.button, opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? "Enregistrement..." : "Réinitialiser mon mot de passe"}
          {!isSubmitting && <ArrowRight size={18} />}
        </button>
      </form>
    </div>
  );
}

export default function ReinitialiserMotDePasseClient() {
  return (
    <div style={styles.page}>
      <Suspense fallback={null}>
        <ReinitialiserMotDePasseForm />
      </Suspense>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: C.arctic,
    fontFamily: "'Montserrat', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    background: C.white,
    borderRadius: "32px",
    padding: "48px 40px",
    boxShadow: "0 10px 40px rgba(17,76,90,0.08)",
    maxWidth: "440px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: 900,
    color: C.teal,
    margin: "16px 0 8px",
  },
  text: {
    fontSize: "14px",
    color: C.gray,
    lineHeight: 1.6,
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputWrap: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  input: {
    width: "100%",
    padding: "14px 14px 14px 44px",
    borderRadius: "16px",
    border: `1px solid ${C.lightGray}`,
    background: C.arctic,
    color: C.teal,
    fontWeight: 600,
    outline: "none",
    fontFamily: "inherit",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: C.yellow,
    color: C.teal,
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "8px",
  },
  errorBox: {
    background: "#fef2f2",
    color: C.red,
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    border: "1px solid #fecaca",
    textAlign: "left",
  },
  link: {
    display: "inline-block",
    marginTop: "16px",
    color: C.teal,
    fontWeight: 700,
    fontSize: "14px",
  },
};
