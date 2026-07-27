export const CATALOGUE_DOCUMENTS = [
  "Fiche sanitaire de liaison",
  "Photocopie attestation d'assurance",
  "Attestation 25m natation",
  "Photocopie carte de mutuelle",
  "Photocopie carte vitale",
];

export function getDocumentLabel(type) {
  return CATALOGUE_DOCUMENTS.find(doc => doc === type) || type;
}
