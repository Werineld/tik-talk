import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup, FormRecord,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockService } from '@tt/data-access';
import { Feature } from '@tt/data-access';
import { KeyValuePipe } from '@angular/common';
import { NameValidator } from './name.validator';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

function getAddressFrom() {
  return new FormGroup({
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    building: new FormControl<number | null>(null, Validators.required),
    apartment: new FormControl<number | null>(null, Validators.required),
  })
}

function validateStartsWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? {startsWith: {message: 'Так нинада'}}
      : null
  }
}

function validateDateRange({fromControlName, toControlName}: {fromControlName: string, toControlName: string}): ValidatorFn {
  return (control: AbstractControl)=> {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if( !fromControl || !toControl ) return null

    const fromDate = new Date(fromControl.value)
    const toDate = new Date(toControl.value)

    return fromDate && toDate && fromDate > toDate
      ? { dateRange: {message: 'Дата начала не может быть позднее даты конца'}}
      : null
  }
}

@Component({
  selector: 'app-forms-experimental',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './forms-experimental.component.html',
  styleUrl: './forms-experimental.component.scss',
  standalone: true,
})
export class FormsExperimentalComponent {
  mockService = inject(MockService)
  nameValidator = inject(NameValidator)
  features: Feature[] = []
  receiverType = ReceiverType;

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur'
    }),
    // [Validators.required], [this.nameValidator.validate.bind(this.nameValidator)]
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([
      getAddressFrom()
    ]),
    feature: new FormRecord({}),
    dateRange: new FormGroup({
      from: new FormControl<string>(''),
      to: new FormControl<string>(''),
    }, validateDateRange({fromControlName: 'from', toControlName: 'to'})),
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

    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features: Feature[]) => {
        this.features = features;
        for (const feature of features) {
          this.form.controls.feature.addControl(feature.code, new FormControl(feature.value));
        }
      })
  }

  onSubmit(event: SubmitEvent) {
    console.log(this.form.valid);
    console.log(this.form.value);

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    this.form.reset();

    if (this.form.invalid) return;
  }

  addAddress() {
    this.form.controls.addresses.push(getAddressFrom())
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false});
  }

  sort = () => 0
}
