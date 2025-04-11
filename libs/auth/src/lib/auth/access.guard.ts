import { inject } from '@angular/core';
import { AuthService } from '@tt/data-access';
import { Router } from '@angular/router';

export const CanActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
