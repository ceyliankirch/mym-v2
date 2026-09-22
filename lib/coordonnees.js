// 📇 Coordonnées de l'association, avec repli sur les valeurs historiques du site
// tant que rien n'a été renseigné dans Admin / Paramètres.
export const COORDONNEES_PAR_DEFAUT = {
  emailContact: "mym.makeyourmoment@gmail.com",
  telephoneContact: "+33 6 98 96 50 02",
  adresseRue: "16 avenue du Rond-Point",
  adresseVille: "94370 Sucy-en-Brie",
};

// À appeler avec le résultat de getParametres() (peut être null).
export function getCoordonnees(parametres) {
  return {
    emailContact: parametres?.emailContact || COORDONNEES_PAR_DEFAUT.emailContact,
    telephoneContact: parametres?.telephoneContact || COORDONNEES_PAR_DEFAUT.telephoneContact,
    adresseRue: parametres?.adresseRue || COORDONNEES_PAR_DEFAUT.adresseRue,
    adresseVille: parametres?.adresseVille || COORDONNEES_PAR_DEFAUT.adresseVille,
  };
}
