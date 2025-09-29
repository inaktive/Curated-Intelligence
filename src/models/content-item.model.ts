export interface ContentItem {
  id: string;
  title: string;
  source: string;
  category: 'Security' | 'Technology' | 'Humans';
  format: 'Article' | 'Video' | 'Podcast' | 'Discussion';
  publishedDate: string; // ISO 8601 format
  url: string;
  summary: string;
  scores: {
    clarityAndCraft: number;
    originalityAndInsight: number;
    evidenceAndRigor: number;
    relevanceAndTimeliness: number;
    signalToNoise: number;
    valueAndApplicability: number;
    final: number;
  };
}
