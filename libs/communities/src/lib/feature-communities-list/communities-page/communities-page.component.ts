import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunitiesFilterComponent } from '../communities-filter/communities-filter.component';
import { Store } from '@ngrx/store';
import { selectFilteredCommunities } from '@tt/data-access';
import { CommunityCardComponent } from '../../ui';

@Component({
  selector: 'tt-communities-page',
  imports: [CommonModule, SvgIconComponent, ReactiveFormsModule, CommunitiesFilterComponent, CommunityCardComponent],
  templateUrl: './communities-page.component.html',
  styleUrl: './communities-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesPageComponent {
  store = inject(Store)
  communities = this.store.selectSignal(selectFilteredCommunities)
}
