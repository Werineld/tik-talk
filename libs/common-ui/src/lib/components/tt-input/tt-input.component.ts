import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tt-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent)
    }
  ]
})
export class TtInputComponent implements ControlValueAccessor{
  type = input<'text' | 'password'>('text')
  placeholder = input<string>()

  onChange: any
  onTouched: any
  disabled = signal<boolean>(false)

  value: string | null = null

  writeValue(val: string | null) {
    this.value = val
  }
  registerOnChange(fn: any): void {
      this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  onModelChange(val: string | null): void {
    this.onChange(val)
  }
}
