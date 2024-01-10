export function handleRemoveTagHtml(str: string) {
  return str ? str.replace(/<[^>]*>|&nbsp;/g, "") : '';
}

export function isEndOfSentence(word: string): boolean {
  return /[.!?]$/.test(word);
}

export function convertToTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}