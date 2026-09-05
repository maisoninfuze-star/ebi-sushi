/**
 * Clé de session de l'intro. Module sans directive « use client » : il doit
 * rester importable depuis le layout serveur (le script pré-rendu en dépend)
 * comme depuis le composant client.
 */
export const INTRO_STORAGE_KEY = "ebi:intro-seen";
