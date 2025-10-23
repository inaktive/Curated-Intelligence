export interface ContentItem {
  id: string;
  title: string;
  source: string;
  category: 'Security' | 'Technology' | 'Humans';
  format: 'Article' | 'Video' | 'Podcast' | 'Discussion';
  publishedDate: string; // ISO 8601 format
  url: string;
  summary: string; // The short summary for the card
  imageUrl: string;
  tags: string[]; // e.g., 'CAIO', 'CISO', 'CRO'
  advisoryJudgement: 'Critical - Act' | 'Important - Monitor' | 'Relevant - Track';
  stakeholders: string[]; // For the detail view pills
}
