import { createSelector } from '@ngrx/store';
import { postFeature } from './reducer';

export const selectAllPosts = createSelector(
  postFeature.selectPosts,
  (posts) => posts
)

export const selectCommentsByPostId = (postId: number) =>
  createSelector(
    postFeature.selectComments,
    (comments) => comments[postId] || []
  )
