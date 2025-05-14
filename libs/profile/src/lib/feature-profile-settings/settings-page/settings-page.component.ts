import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '@tt/data-access';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from '../../ui';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
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
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
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
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      }),
    );
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack.split(',');
  }
}
