import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles } from '@tt/data-access';
import { InfiniteScrollTriggerComponent } from '@tt/common-ui';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent, CommonModule, InfiniteScrollTriggerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }

}
