import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalStoreService, Pageble, Profile } from '@tt/data-access';
import { tap } from 'rxjs';
import { Community } from '../interfaces/community.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  http = inject(HttpClient)
  globalStoreService = inject(GlobalStoreService);
  baseApiUrl = '/yt-course/';

  filteredCommunities = signal<Community[] | null>([]);

  subscribeCommunity(communityId: number) {
    return this.http.post(`${this.baseApiUrl}community/${communityId}/join`, null
    );
  }

  unsubscribeCommunity(communityId: number) {
    return this.http.delete<Profile>(
      `${this.baseApiUrl}community/${communityId}/join`
    );
  }

  filterCommunities(params: Record<string, any>) {
    return this.http
      .get<Pageble<Community>>(`${this.baseApiUrl}community/`, {
        params,
      })
      .pipe(tap((res) => this.filteredCommunities.set(res.items)));

  }

}
