import { Post, PostComment } from '@tt/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postActions } from './actions';

export interface PostState {
  posts: Post[];
  comments: Record<number, PostComment[]>;
}

export const initialState: PostState = {
  posts: [],
  comments: [],
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,

    on(postActions.postsLoaded, (state, { posts }) => ({
      ...state,
      posts
    })),

    on(postActions.commentsLoaded, (state, { comments }) => ({
      ...state,
      comments: {
        ...state,
        comments,
        [comments[0]?.postId]: comments
      }
    })),

  )
})
