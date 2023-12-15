export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function handleRemoveTagHtml(str: string) {
  return str ? str.replace(/<[^>]*>|&nbsp;/g, "") : '';
}

export function isEndOfSentence(word: string): boolean {
  return /[.!?]$/.test(word);
}
