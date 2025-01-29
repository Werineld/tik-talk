import {Routes} from '@angular/router';
import {CanActivateAuth} from './auth/access.guard';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {chatsRoutes} from './pages/chats/chatsRoutes'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      {
				path: 'chats',
				loadChildren: () => chatsRoutes
			},
    ],
    canActivate: [CanActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
