import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { postActions, selectAllPosts } from '../../data';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { Store } from '@ngrx/store';
import { GlobalStoreService } from '@tt/data-access';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);
  store = inject(Store);
  profile = inject(GlobalStoreService).me;

  feed = this.store.selectSignal(selectAllPosts);

  ngOnInit() {
    this.resizeFeed();
    this.store.dispatch(postActions.fetchPosts({}));

    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => this.resizeFeed());
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 96;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  async onPostCreated(content: string) {
    if (!content.trim()) return;

    this.store.dispatch(postActions.createPost({
      payload: {
        title: 'Какой-то пост',
        content: content,
        authorId: this.profile()!.id
      }
    }));

    this.store.dispatch(postActions.fetchPosts({}));
  }
}
