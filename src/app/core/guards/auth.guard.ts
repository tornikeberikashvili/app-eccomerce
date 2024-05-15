import {CanActivateFn, Router} from '@angular/router';
import {AuthFacades} from "../../facades";
import {inject} from "@angular/core";


export const authGuard: CanActivateFn = (route, state) => {
 const authFacade = inject(AuthFacades);
  const router = inject(Router);
  if (!authFacade.isAuthenticated) {
    return router.createUrlTree(['/auth']);

  }
  return authFacade.isAuthenticated;


};
