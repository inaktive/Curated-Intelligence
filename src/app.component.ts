import { ChangeDetectionStrategy, Component, signal, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LibraryComponent } from './components/library/library.component';
import { ContentItem } from './models/content-item.model';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DashboardComponent, LibraryComponent, DetailedViewComponent],
})
export class AppComponent {
  activeView = signal<'dashboard' | 'library'>('dashboard');
  selectedContentItem = signal<ContentItem | null>(null);

  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      // When the detailed view modal is open, prevent the body from scrolling.
      // When it's closed, restore scrolling.
      if (this.selectedContentItem()) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = '';
      }
    });
  }

  setView(view: 'dashboard' | 'library') {
    this.activeView.set(view);
  }

  showDetails(item: ContentItem) {
    this.selectedContentItem.set(item);
  }

  closeDetails() {
    this.selectedContentItem.set(null);
  }
}
