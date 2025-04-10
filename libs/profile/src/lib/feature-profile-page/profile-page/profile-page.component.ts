import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostFeedComponent } from '@tt/posts';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';
import { switchMap } from 'rxjs';

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
    }),
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
