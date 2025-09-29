import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { ContentItem } from '../../models/content-item.model';
import { ContentCardComponent } from '../content-card/content-card.component';

type CategoryFilter = 'All' | 'Security' | 'Technology' | 'Humans';
type FormatFilter = 'All' | 'Article' | 'Video' | 'Podcast' | 'Discussion';
type TimeFilter = '24h' | '7d';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ContentCardComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  itemSelected = output<ContentItem>();

  private contentService = inject(ContentService);
  private allContent = this.contentService.getContent();

  // Filter signals
  qualityThreshold = signal(70);
  selectedCategory = signal<CategoryFilter>('All');
  selectedFormat = signal<FormatFilter>('All');
  selectedTime = signal<TimeFilter>('7d');

  readonly categories: CategoryFilter[] = ['All', 'Security', 'Technology', 'Humans'];
  readonly formats: FormatFilter[] = ['All', 'Article', 'Video', 'Podcast', 'Discussion'];

  filteredContent = computed(() => {
    const threshold = this.qualityThreshold();
    const category = this.selectedCategory();
    const format = this.selectedFormat();
    const time = this.selectedTime();
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    return this.allContent()
      .filter(item => item.scores.final >= threshold)
      .filter(item => category === 'All' || item.category === category)
      .filter(item => format === 'All' || item.format === format)
      .filter(item => {
        const itemDate = new Date(item.publishedDate);
        if (time === '24h') {
            return itemDate >= twentyFourHoursAgo;
        }
        return itemDate >= sevenDaysAgo; // '7d' is the default and max
      })
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  });

  onSliderChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.qualityThreshold.set(Number(value));
  }
  
  selectCategory(category: CategoryFilter) {
    this.selectedCategory.set(category);
  }

  selectFormat(format: FormatFilter) {
    this.selectedFormat.set(format);
  }

  selectTime(time: TimeFilter) {
    this.selectedTime.set(time);
  }

  onItemClicked(item: ContentItem) {
    this.itemSelected.emit(item);
  }
}
