import { Component, Input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],

  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
