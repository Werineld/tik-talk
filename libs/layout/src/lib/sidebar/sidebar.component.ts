import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SvgIconComponent, ImgUrlPipe } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, ChatsService, ProfileService, isErrorMessage } from '@tt/data-access';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Subscription, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  #chatService = inject(ChatsService);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef)

  subscribers$ = this.profileService.getSubscribersShortList();
  unreadMessages = this.#chatService.unreadMessageCount
  wsSubscribe!: Subscription;

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
      unreadMessages: this.unreadMessages()
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  connectWS() {
    this.wsSubscribe?.unsubscribe()
    this.wsSubscribe = this.#chatService
      .connectWS()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message) => {
        if (isErrorMessage(message)) {
          console.log('Неверный токен')
          this.reconnectWS()
        }
      })
  }

  async ngOnInit() {
    await firstValueFrom(this.profileService.getMe());
    this.connectWS()
  }

  async reconnectWS() {
    console.log('reconnecting...');
    await firstValueFrom(this.profileService.getMe());
    await firstValueFrom(timer(2000))
    this.connectWS()
  }
}
