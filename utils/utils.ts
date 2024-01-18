export function handleRemoveTagHtml(str: string) {
  return str ? str.replace(/<[^>]*>|&nbsp;/g, "") : '';
}

export function isEndOfSentence(word: string): boolean {
  return /[.!?]$/.test(word);
}

export function convertToTitleCaseForDisplay(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

export function convertToTitleCaseForPath(str: string) {
  const parts = str.split('_');
  const convertedParts = parts.map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)));

  return convertedParts.join('');
}

function calculateTimeElapsed(commentTime: any) {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - new Date(commentTime).getTime();
  const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));

  return elapsedMinutes;
}

export function createTimelineString(commentTime: string | Date) {
  const elapsedMinutes = calculateTimeElapsed(commentTime);

  if (isNaN(elapsedMinutes)) {
    return 'Invalid';
  } else if (elapsedMinutes === 0) {
    return 'Just now';
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
  } else if (elapsedMinutes < 1440) {
    const hours = Math.floor(elapsedMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (elapsedMinutes < 43200) { // Approximately 30 days in a month
    const days = Math.floor(elapsedMinutes / 1440);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (elapsedMinutes < 525600) { // Exactly 365 days in a year
    const years = Math.floor(elapsedMinutes / 43200);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else {
    const centuries = Math.floor(elapsedMinutes / 525600);
    return `${centuries} century${centuries > 1 ? 's' : ''} ago`;
  }
}