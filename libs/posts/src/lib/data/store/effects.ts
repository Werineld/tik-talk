import { inject, Injectable } from '@angular/core';
import { PostService } from '../services/post.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postActions } from './actions';
import { map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class PostEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)

  loadPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchPosts),
      switchMap(() =>
        this.postService.fetchPosts().pipe(
          map((posts) => postActions.postsLoaded({ posts })),
        )
      )
    )
  })

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap(({ payload }) =>
        this.postService
          .createPost({
            title: payload.title,
            content: payload.content,
            authorId: payload.authorId
          })
          .pipe(
            map(() => postActions.fetchPosts({ })),
          )
      )
    )
  })

  loadComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchComments),
      switchMap(({ postId }) =>
        this.postService
          .getCommentsByPostId(postId)
          .pipe(
            map(( comments ) => postActions.commentsLoaded({ comments } )),
          )
      )
    )
  })

  createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createComment),
      switchMap(({ payload }) =>
        this.postService
          .createComment({
            text: payload.text,
            authorId: payload.authorId,
            postId: payload.postId,
          })
          .pipe(
            map(() => postActions.fetchPosts({  })),
          )
      )
    )
  })

}

