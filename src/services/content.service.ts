import { Injectable, signal } from '@angular/core';
import { ContentItem } from '../models/content-item.model';

const MOCK_DATA: ContentItem[] = [
    {
        id: '1',
        title: 'The Shifting Landscape of Cyber Warfare',
        source: 'Schneier on Security',
        category: 'Security',
        format: 'Article',
        publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'An in-depth analysis of new offensive cyber capabilities demonstrated by nation-states and their implications for global stability.',
        scores: { clarityAndCraft: 92, originalityAndInsight: 88, evidenceAndRigor: 95, relevanceAndTimeliness: 98, signalToNoise: 90, valueAndApplicability: 85, final: 91 }
    },
    {
        id: '2',
        title: 'Podcast: The Ethics of AI in Autonomous Systems',
        source: 'Lawfare',
        category: 'Security',
        format: 'Podcast',
        publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'A discussion with legal experts and technologists on the challenges of programming ethical frameworks into military and civilian autonomous machines.',
        scores: { clarityAndCraft: 85, originalityAndInsight: 90, evidenceAndRigor: 88, relevanceAndTimeliness: 92, signalToNoise: 80, valueAndApplicability: 84, final: 87 }
    },
    {
        id: '3',
        title: 'The Quantum Computing Race: Hype vs. Reality',
        source: 'MIT Tech Review',
        category: 'Technology',
        format: 'Article',
        publishedDate: new Date().toISOString(),
        url: '#',
        summary: 'Separating the facts from the fiction in the current state of quantum computing, with a realistic timeline for practical applications.',
        scores: { clarityAndCraft: 95, originalityAndInsight: 85, evidenceAndRigor: 92, relevanceAndTimeliness: 90, signalToNoise: 88, valueAndApplicability: 89, final: 90 }
    },
    {
        id: '4',
        title: 'Video: The Future of User Interfaces',
        source: 'Marques Brownlee',
        category: 'Technology',
        format: 'Video',
        publishedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'MKBHD explores the potential of brain-computer interfaces, spatial computing, and AI-driven UIs that could replace the smartphone.',
        scores: { clarityAndCraft: 98, originalityAndInsight: 80, evidenceAndRigor: 75, relevanceAndTimeliness: 88, signalToNoise: 85, valueAndApplicability: 82, final: 85 }
    },
    {
        id: '5',
        title: 'Global Economic Trends Post-Pandemic',
        source: 'The Economist',
        category: 'Humans',
        format: 'Article',
        publishedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'A comprehensive look at inflationary pressures, supply chain restructuring, and the future of work in a changed world.',
        scores: { clarityAndCraft: 90, originalityAndInsight: 82, evidenceAndRigor: 94, relevanceAndTimeliness: 91, signalToNoise: 80, valueAndApplicability: 88, final: 88 }
    },
    {
        id: '6',
        title: 'Hacker News Thread on New Code Editor',
        source: 'Hacker News',
        category: 'Technology',
        format: 'Discussion',
        publishedDate: new Date(Date.now() - 1 * 12 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'A popular discussion thread on a new, Rust-based code editor promising significant performance improvements over existing tools.',
        scores: { clarityAndCraft: 60, originalityAndInsight: 75, evidenceAndRigor: 50, relevanceAndTimeliness: 95, signalToNoise: 40, valueAndApplicability: 70, final: 65 }
    },
    {
        id: '7',
        title: 'Societal Impacts of Declining Trust in Institutions',
        source: 'Pew Research',
        category: 'Humans',
        format: 'Article',
        publishedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'Data-driven report on the long-term trends of public trust in government, media, and science, and the consequences for social cohesion.',
        scores: { clarityAndCraft: 88, originalityAndInsight: 86, evidenceAndRigor: 98, relevanceAndTimeliness: 85, signalToNoise: 92, valueAndApplicability: 90, final: 90 }
    },
    {
        id: '8',
        title: 'A New Zero-Day Exploit Discovered',
        source: 'Mandiant',
        category: 'Security',
        format: 'Article',
        publishedDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        url: '#',
        summary: 'Technical breakdown of a critical vulnerability found in widely used enterprise software, with indicators of compromise.',
        scores: { clarityAndCraft: 78, originalityAndInsight: 95, evidenceAndRigor: 98, relevanceAndTimeliness: 100, signalToNoise: 85, valueAndApplicability: 99, final: 93 }
    },
];

@Injectable({ providedIn: 'root' })
export class ContentService {
  private allContent = signal<ContentItem[]>(MOCK_DATA);
  
  getContent() {
    return this.allContent.asReadonly();
  }
}
