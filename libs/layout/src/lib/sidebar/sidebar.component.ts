import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '@tt/data-access';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    CommonModule,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
