import {ChatsService} from './../../data/services/chats.service';
import {CommonModule} from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {firstValueFrom, switchMap} from 'rxjs';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {ProfileService} from './../../data/services/profile.service';
import {PostFeedComponent} from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    CommonModule,
    RouterModule,
    SvgIconComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  ProfileService = inject(ProfileService);
  ChatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  subscribers$ = this.ProfileService.getSubscribersShortList(5);
  me$ = toObservable(this.ProfileService.me);

  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.ProfileService.me()?.id);
      if (id == 'me') {
        return this.me$;
      }

      return this.ProfileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    firstValueFrom( this.ChatsService.createChat(userId))
      .then((res) => {
        this.router.navigate(['/chats', res.id]);
      })
  }
}
