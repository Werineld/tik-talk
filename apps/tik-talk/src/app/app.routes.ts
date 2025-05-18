import { Routes } from '@angular/router';
import { CanActivateAuth } from '@tt/auth';
import { LayoutComponent } from '@tt/layout';
import { LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent } from '@tt/profile';
import { SearchPageComponent } from '@tt/profile';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { FormsExperimentalComponent } from '../../../../libs/form/src/lib/form/forms-experimental.component';
import { provideState } from '@ngrx/store';
import { profileFeature, profileEffects, PostEffects, postFeature } from '@tt/data-access';
import { provideEffects } from '@ngrx/effects';

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
