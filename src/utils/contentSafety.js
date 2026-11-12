const blockedTerms = ["fuck", "shit", "bitch", "bastard", "asshole", "dick", "piss"];

export function containsBlockedLanguage(value = "") {
  const normalized = String(value).toLowerCase();
  return blockedTerms.some((term) => new RegExp(`\\b${term}\\b`, "i").test(normalized));
}
