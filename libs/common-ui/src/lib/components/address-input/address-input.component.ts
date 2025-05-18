import { Component, forwardRef, inject, signal } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TtInputComponent } from '@tt/common-ui';
import { DadataService } from '@tt/data-access';
import { debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'tt-address-input',
  imports: [CommonModule, TtInputComponent, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent)
    }
  ]
})
export class AddressInputComponent implements ControlValueAccessor{
  #dadataService = inject(DadataService)
  innerSearchControl = new FormControl()

  isDropdownOpened = signal<boolean>(true)

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(val => {
        return this.#dadataService.getSuggestion(val)
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(!!res.length)
            })
          )
      })
    )


  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onChange(value: any): void {

  }

  onTouched() {

  }

  onSuggestClick(city: string) {
    this.isDropdownOpened.set(false)
    this.writeValue(city)
    this.onChange(city)
  }

}
