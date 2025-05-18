import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '@tt/data-access';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from '../../ui';
import { AddressInputComponent, StackInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent, StackInputComponent, AddressInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUplodaer!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    address: [null],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUplodaer.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUplodaer.avatar),
      );
    }

    firstValueFrom(
      //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value
      }),
    );
  }

}
