import { StoriesInterface } from '@/types';

export function isEndOfSentence(word: string): boolean {
  return /[.!?]$/.test(word);
}

export function convertToTitleCaseForDisplay(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

export function convertToTitleCaseForPath(str: string) {
  const parts = str.split('_');
  const convertedParts = parts.map((part, index) =>
    index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
  );

  return convertedParts.join('');
}

export function convertToSnakeCase(inputString: string) {
  return inputString
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '') 
    .replace(/\s+/g, '_')
}

function calculateTimeElapsed(commentTime: any) {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - new Date(commentTime).getTime();
  const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));

  return elapsedMinutes;
}

export function createTimelineString(commentTime: string | Date) {
  const elapsedMinutes = calculateTimeElapsed(commentTime);

  switch (true) {
    case isNaN(elapsedMinutes):
      return 'Invalid';
    case elapsedMinutes === 0:
      return 'Just now';
    case elapsedMinutes < 60:
      return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
    case elapsedMinutes < 1440:
      const hours = Math.floor(elapsedMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    case elapsedMinutes < 43200:
      const days = Math.floor(elapsedMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    case elapsedMinutes < 525600:
      const years = Math.floor(elapsedMinutes / 43200);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    default:
      const centuries = Math.floor(elapsedMinutes / 525600);
      return `${centuries} century${centuries > 1 ? 's' : ''} ago`;
  }
}

export function processLabels(labels: string[]) {
  const processedLabels: string[] = [];

  for (const label of labels) {
    switch (label) {
      case 'label-full':
        processedLabels.push('full');
        break;
      case 'label-hot':
        processedLabels.push('hot');
        break;
      case 'label-new':
        processedLabels.push('new');
        break;
      default:
        processedLabels.push('');
        break;
    }
  }

  return [...new Set(processedLabels)];
}

export function getColor(label: string) {
  switch (label) {
    case 'full':
      return {
        padding: '5px',
      };
    case 'hot':
      return {
        padding: '5px',
      };
    case 'new':
      return {
        padding: '5px',
      };
    default:
      return {
        padding: '5px',
      };
  }
}

export function classifyStoriesByLabel(stories: StoriesInterface[]) {
  const storiesByLabel = {
    new: [] as StoriesInterface[],
    hot: [] as StoriesInterface[],
    full: [] as StoriesInterface[],
  };

  stories && stories.length && stories.forEach((story) => {
    story.statusLabels.forEach((label) => {
      switch (label) {
        case 'label-new':
          storiesByLabel['new'].push(story);
          break;
        case 'label-hot':
          storiesByLabel['hot'].push(story);
          break;
        case 'label-full':
          storiesByLabel['full'].push(story);
          break;
        default:
          break;
      }
    });
  });

  return storiesByLabel;
}
