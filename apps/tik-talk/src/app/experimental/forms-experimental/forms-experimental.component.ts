import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

@Component({
  selector: 'app-forms-experimental',
  imports: [ReactiveFormsModule],
  templateUrl: './forms-experimental.component.html',
  styleUrl: './forms-experimental.component.scss',
})
export class FormsExperimentalComponent {
  receiverType = ReceiverType;
  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    address: new FormGroup({
      city: new FormControl<string>('', Validators.required),
      street: new FormControl<string>('', Validators.required),
      building: new FormControl<number | null>(null, Validators.required),
      apartment: new FormControl<number | null>(null, Validators.required),
    }),
  });

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        console.log(value);
        this.form.controls.inn.clearValidators();
        this.form.controls.lastName.clearValidators();
        if (value === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        } else {
          this.form.controls.lastName.setValidators(Validators.required);
        }
      });
  }

  onSubmit(event: SubmitEvent) {
    console.log(this.form.valid);
    console.log(this.form.value);

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    this.form.reset();

    if (this.form.invalid) return;
  }
}
