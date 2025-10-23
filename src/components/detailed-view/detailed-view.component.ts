import { ChangeDetectionStrategy, Component, effect, inject, input, OnDestroy, output, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContentItem } from '../../models/content-item.model';
import { GeminiService, ExecutiveSummary, LessonsForCSuite } from '../../services/gemini.service';
import { LibraryService } from '../../services/library.service';

type AiState = 'idle' | 'loading' | 'loaded' | 'error';
type Tab = 'executive' | 'lessons';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './detailed-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedViewComponent implements OnDestroy {
  contentItem = input.required<ContentItem>();
  closeModal = output<void>();

  private geminiService = inject(GeminiService);
  private libraryService = inject(LibraryService);

  // Component State
  isSaved = signal(false);
  activeTab = signal<Tab>('executive');
  showCopiedTooltip = signal(false);
  private tooltipTimeout: any;
  
  // AI-generated content state
  executiveSummary = signal<ExecutiveSummary | null>(null);
  lessonsForCSuite = signal<LessonsForCSuite | null>(null);
  aiState = signal<AiState>('idle');
  aiError = signal<string | null>(null);

  constructor() {
    effect(() => {
        const item = this.contentItem();
        this.resetState();
        this.isSaved.set(this.libraryService.isSaved(item.id));
        this.generateAiContent(item); 
    }, { allowSignalWrites: true });
  }

  ngOnDestroy() {
    clearTimeout(this.tooltipTimeout);
  }

  private resetState() {
    this.activeTab.set('executive');
    this.executiveSummary.set(null);
    this.lessonsForCSuite.set(null);
    this.aiState.set('idle');
    this.aiError.set(null);
  }

  async generateAiContent(item: ContentItem) {
    this.aiState.set('loading');
    this.aiError.set(null);

    try {
      const summary = await this.geminiService.generateExecutiveSummary(item);
      this.executiveSummary.set(summary);
      
      // Now fetch the second part, dependent on the first
      const lessons = await this.geminiService.generateLessonsForCSuite(item, summary);
      this.lessonsForCSuite.set(lessons);

      this.aiState.set('loaded');
    } catch(e) {
      this.aiState.set('error');
      this.aiError.set(e instanceof Error ? e.message : 'An unknown error occurred while generating AI analysis.');
    }
  }

  toggleSave() {
    const item = this.contentItem();
    this.libraryService.toggleItem(item.id);
    this.isSaved.set(this.libraryService.isSaved(item.id));
  }
  
  share() {
    clearTimeout(this.tooltipTimeout);
    const item = this.contentItem();
    const url = `${window.location.origin}${window.location.pathname}#item/${item.id}`;
    navigator.clipboard.writeText(url).then(() => {
      this.showCopiedTooltip.set(true);
      this.tooltipTimeout = setTimeout(() => {
        this.showCopiedTooltip.set(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  getStakeholderColor(stakeholder: string): string {
    const colors: {[key: string]: string} = {
      'Civil Society': 'bg-green-500/20 text-green-300',
      'Enterprises': 'bg-sky-500/20 text-sky-300',
      'Global & Multilateral': 'bg-indigo-500/20 text-indigo-300',
      'Government': 'bg-red-500/20 text-red-300',
      'Technology': 'bg-amber-500/20 text-amber-300',
      'Workforce': 'bg-pink-500/20 text-pink-300',
    };
    return colors[stakeholder] || 'bg-slate-600/50 text-slate-300';
  }

  getTagColor(tag: string): string {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('ciso') || lowerTag.includes('cro')) return 'bg-red-600 text-white';
    if (lowerTag.includes('caio') || lowerTag.includes('cto') || lowerTag.includes('cio')) return 'bg-orange-600 text-white';
    if (lowerTag.includes('clo')) return 'bg-yellow-600 text-black';
    if (lowerTag.includes('incident') || lowerTag.includes('restore')) return 'bg-rose-600 text-white';
    if (lowerTag.includes('evolve') || lowerTag.includes('monitor')) return 'bg-teal-500 text-white';
    return 'bg-slate-600 text-white';
  }

  getAdvisoryColor(judgement: ContentItem['advisoryJudgement']): string {
    if (judgement === 'Critical - Act') return 'bg-red-600 text-white';
    if (judgement === 'Important - Monitor') return 'bg-yellow-500 text-black';
    return 'bg-green-600 text-white';
  }
  
  close() {
    this.closeModal.emit();
  }
}
