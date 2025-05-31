import { createActionGroup, props } from '@ngrx/store';
import { Community } from '../interfaces/community.interface';
import { Subscription } from 'rxjs';

export const communityActions = createActionGroup({
  source: 'communities',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'communities loaded': props<{ communities: Community[] }>(),
  },
});
