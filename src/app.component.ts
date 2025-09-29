import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
