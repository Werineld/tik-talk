import {Component, ElementRef, inject, Renderer2,} from '@angular/core';
import {debounceTime, firstValueFrom, fromEvent} from 'rxjs';
import {PostService} from '../../../data/services/post.service';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  feed = this.postService.posts;

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngOnInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.resizeFeed();
        console.log(1);
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 96 ;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
