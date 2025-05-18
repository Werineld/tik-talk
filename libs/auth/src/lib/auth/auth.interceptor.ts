import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '@tt/data-access';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('dadata.ru')) return next(req);
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  if (isRefreshing$.value) {
    return refreshandProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 403 || err.status === 401) {
        return refreshandProceed(authService, req, next);
      }

      return throwError(err);
    }),
  );
};

const refreshandProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        return next(addToken(req, res.access_token)).pipe(
          tap(() => isRefreshing$.next(false)),
        );
      }),
    );
  }

  if (req.url.includes('refresh'))
    return next(addToken(req, authService.token!));

  return isRefreshing$.pipe(
    filter((isRefreshing$) => !isRefreshing$),
    switchMap(() => {
      return next(addToken(req, authService.token!));
    }),
  );
};
const addToken = (req: HttpRequest<any>, token: string) => {
  return (req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }));
};
