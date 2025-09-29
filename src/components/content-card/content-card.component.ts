import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItem } from '../../models/content-item.model';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCardComponent {
  item = input.required<ContentItem>();

  badgeInfo = computed(() => {
    const score = this.item().scores.final;
    if (score >= 85) {
      return { class: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'High Signal' };
    } else if (score >= 70) {
      return { class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', text: 'Mixed' };
    } else {
      return { class: 'bg-red-500/20 text-red-400 border-red-500/30', text: 'Low Signal' };
    }
  });

  categoryClass = computed(() => {
    const category = this.item().category;
    switch (category) {
      case 'Security': return 'text-red-400';
      case 'Technology': return 'text-blue-400';
      case 'Humans': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  });

  timeSince = computed(() => {
    const date = new Date(this.item().publishedDate);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  });
}
