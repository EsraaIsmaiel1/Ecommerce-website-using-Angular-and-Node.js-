import { CanActivateFn } from '@angular/router';
import {Router,RouterStateSnapshot ,ActivatedRouteSnapshot} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state :RouterStateSnapshot) => {
const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.isLoggedIn.pipe(
    map((status) => {
      if (status) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  );};
