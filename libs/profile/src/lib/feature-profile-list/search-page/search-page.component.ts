import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '../../data';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  title = 'tik-talk';

  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);
}
