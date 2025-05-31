import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener, signal } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tt-stack-input',
  imports: [CommonModule, SvgIconComponent, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent)
    }
  ]
})
export class StackInputComponent implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([]);
  #disabled = false;

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled;
  }

  innerInput = '';

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    if(!this.innerInput) return;

    this.value$.next([...this.value$.value, this.innerInput]);
    this.innerInput = '';
    this.onChanged(this.value$.value);
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }
    this.value$.next([...stack]); // Create a new array
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled;
  }

  onChanged(value: string[] | null) {}
  onTouched() {}

  onTagDelete(i: number) {
    const tags = [...this.value$.value]; // Create a new array copy
    tags.splice(i, 1); // Modify the copy
    this.value$.next(tags); // Emit the new array
    this.onChanged(tags);
  }
}
