import { createSelector } from '@ngrx/store';
import { communityFeature } from './reducer';

export const selectFilteredCommunities = createSelector(
  communityFeature.selectCommunities,
  (communities) => communities

)
