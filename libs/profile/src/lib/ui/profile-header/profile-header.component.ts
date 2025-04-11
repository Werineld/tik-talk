import { Component, input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();

  logProfile() {
    console.log(this.profile);

    return this.profile;
  }
}
