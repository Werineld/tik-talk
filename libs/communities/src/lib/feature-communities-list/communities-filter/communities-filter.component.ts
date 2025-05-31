import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent, StackInputComponent, SvgIconComponent, TtInputComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { debounceTime, startWith, Subscription, switchMap, tap } from 'rxjs';
import { communityActions, profileActions } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-communities-filter',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SvgIconComponent, TtInputComponent, SelectComponent, StackInputComponent],
  templateUrl: './communities-filter.component.html',
  styleUrl: './communities-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesFilterComponent {
  store = inject(Store)
  searchFormSub!: Subscription;

  searchForm = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
    themes: new FormControl<string[] | null>([], Validators.required),
    tags: new FormControl<string[] | null>([], Validators.required),
  });

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        takeUntilDestroyed(),
        tap(() => {
          console.log(this.searchForm.value);
        })
      )
      .subscribe(formValue => {
        this.store.dispatch(communityActions.filterEvents({filters: formValue}))
      });
  }

}
