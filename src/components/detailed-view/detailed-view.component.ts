import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItem } from '../../models/content-item.model';
import { GeminiService } from '../../services/gemini.service';
import { LibraryService } from '../../services/library.service';

type NoteState = 'idle' | 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedViewComponent {
  contentItem = input.required<ContentItem>();
  closeModal = output<void>();

  private geminiService = inject(GeminiService);
  private libraryService = inject(LibraryService);

  curatorNote = signal('');
  noteState = signal<NoteState>('idle');
  isSaved = signal(false);

  constructor() {
    effect(() => {
        this.noteState.set('idle');
        this.curatorNote.set('');
        this.isSaved.set(this.libraryService.isSaved(this.contentItem().id));
    });
  }

  isSavedItem = computed(() => this.libraryService.isSaved(this.contentItem().id));

  toggleSave() {
    this.libraryService.toggleItem(this.contentItem().id);
    this.isSaved.set(this.libraryService.isSaved(this.contentItem().id));
  }

  async getCuratorNote() {
    this.noteState.set('loading');
    const note = await this.geminiService.generateCuratorNote(this.contentItem());
    this.curatorNote.set(note);
    if (this.geminiService.error()) {
        this.noteState.set('error');
    } else {
        this.noteState.set('loaded');
    }
  }

  getScoreColor(score: number): string {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  }

  close() {
    this.closeModal.emit();
  }
}
