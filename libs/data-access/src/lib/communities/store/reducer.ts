import { Community } from '../interfaces/community.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { communityActions } from './actions';
import { profileActions } from '../../profile';

export interface CommunityState {
  communities: Community[];
  communityFilters: Record<string, any>;
}

export const initialState: CommunityState = {
  communities: [],
  communityFilters: {},
}

export const communityFeature = createFeature({
  name: 'communityFeature',
  reducer: createReducer(
    initialState,
    on(communityActions.communitiesLoaded, (state, payload) => {
      return {
        ...state,
        communities: payload.communities
      }
    }),
    on(communityActions.filterEvents, (state, payload) => {
      return {
        ...state,
        Community: [],
        communityFilters: payload.filters,
        page: 1
      };
    }),
  )
})
