import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContentItem } from '../../models/content-item.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, DatePipe],
  templateUrl: './content-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCardComponent {
  item = input.required<ContentItem>();
  index = input<number>(0);

  advisoryColor = computed(() => {
    const judgement = this.item().advisoryJudgement;
    if (judgement === 'Critical - Act') return 'bg-red-600 text-white';
    if (judgement === 'Important - Monitor') return 'bg-yellow-500 text-black';
    return 'bg-green-600 text-white';
  });

  getTagColor(tag: string): string {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('ciso') || lowerTag.includes('cro')) {
      return 'bg-red-500 text-white';
    }
    if (lowerTag.includes('caio') || lowerTag.includes('cto')) {
      return 'bg-orange-500 text-white';
    }
     if (lowerTag.includes('board')) {
      return 'bg-purple-600 text-white';
    }
    return 'bg-slate-600 text-white';
  }
}
