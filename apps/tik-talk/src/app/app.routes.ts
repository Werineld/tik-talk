import { Routes } from '@angular/router';
import { CanActivateAuth } from '@tt/auth';
import { LayoutComponent } from '@tt/layout';
import { LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent } from '@tt/profile';
import { SearchPageComponent } from '@tt/profile';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { FormsExperimentalComponent } from '@tt/form';
import { provideState } from '@ngrx/store';
import {
  profileFeature,
  profileEffects,
  PostEffects,
  postFeature,
  communityFeature,
  CommunityEffects
} from '@tt/data-access';
import { provideEffects } from '@ngrx/effects';
import { CommunitiesPageComponent } from '@tt/community';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent,providers: [
          provideState(postFeature),
          provideEffects(PostEffects)
        ] },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(profileEffects)
        ]
      },
      {
        path: 'communities',
        component: CommunitiesPageComponent,
        providers: [
          provideState(communityFeature),
          provideEffects(CommunityEffects)
        ]
      },
      { path: 'form', component: FormsExperimentalComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [CanActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
