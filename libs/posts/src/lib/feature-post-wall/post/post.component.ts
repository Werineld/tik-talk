import { Component, inject, input } from '@angular/core';
import { postActions, selectCommentsByPostId } from '../../data/';
import { SvgIconComponent } from '@tt/common-ui';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, calcDatePipe } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { GlobalStoreService } from '@tt/data-access';
import { Post } from '@tt/data-access'

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    calcDatePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input<Post>();
  profile = inject(GlobalStoreService).me;
  store = inject(Store);
  comments = this.store.selectSignal(selectCommentsByPostId)

  async onCommentCreated(content: string) {
    if (!content.trim()) return;

    this.store.dispatch(
      postActions.createComment({
        payload: {
          text: content,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        },
      })
    );

    this.store.dispatch(
      postActions.fetchComments({ postId: this.post()!.id }),
    );
  }
}
