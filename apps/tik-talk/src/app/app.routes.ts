import { Routes } from '@angular/router';
import { CanActivateAuth } from '@tt/auth';
import { LayoutComponent } from '@tt/layout';
import { LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent } from '@tt/profile';
import { SearchPageComponent } from '@tt/profile';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { FormsExperimentalComponent } from './experimental/forms-experimental/forms-experimental.component';
import { provideState } from '@ngrx/store';
import { profileFeature } from '@tt/profile';
import { provideEffects } from '@ngrx/effects';
import { profileEffects } from '@tt/profile';
import { PostEffects, postFeature } from '../../../../libs/posts/src/lib/data';

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
