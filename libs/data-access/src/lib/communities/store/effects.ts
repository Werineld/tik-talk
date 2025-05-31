import { inject, Injectable } from '@angular/core';
import { CommunityService } from '../services/community.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { communityActions } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityEffects {
  communityService = inject(CommunityService)
  actions$ = inject(Actions);

  filterCommunities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.filterEvents),
      switchMap(({ filters }) => {
        return this.communityService.filterCommunities(filters)
      }),
      map(res => communityActions.communitiesLoaded({ communities: res.items }))
    )
  })

}
