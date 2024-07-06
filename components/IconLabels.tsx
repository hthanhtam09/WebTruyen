export function IconLabels(label: string) {
  switch (label) {
    case 'full':
      return <img src="/images/full.png" alt="Full Icon" className="w-12 h-12" />;
    case 'hot':
      return <img src="/images/fire.png" alt="Hot Icon" className="w-11 h-11" />;
    case 'new':
      return <img src="/images/star.png" alt="New Icon" className="w-12 h-12" />;
    default:
      return null;
  }
}
