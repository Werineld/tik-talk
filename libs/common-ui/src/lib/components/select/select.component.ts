import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef, HostListener,
  inject,
  Input,
  signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-select',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor{
  @Input() options: string[] = [];
  @Input() placeholder: string = '';

  elRef = inject(ElementRef);

  isOpened = signal<boolean>(false);
  selectedValue = signal<string[] | null>(null);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = this.elRef.nativeElement.contains(target);
    const clickedOnDropdown = target.closest('.custom-select__dropdown');

    if (!clickedInside && !clickedOnDropdown) {
      this.isOpened.set(false);
      this.onTouched();
    }
  }

  writeValue(value: string[] | null): void {
    this.selectedValue.set(value);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
  }
  onChanged(value: string[] | null) {}
  onTouched() {}

  onSelectOption(option: string[]): void {
    this.selectedValue.set(option);
    this.onChanged(option);
    this.onTouched();
  }

  toggleDropdown(): void {
    this.isOpened.update(opened => !opened);
    this.onTouched();
  }

  onThemeDelete(event: MouseEvent) {
    event.stopPropagation();
    this.selectedValue.set(null);
    console.log('btn clicked');
  }

}
