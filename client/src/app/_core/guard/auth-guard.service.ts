import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { RefreshTokenService } from './../services/token/refreshToken.service';
import { RoleAccessService } from '../services/role/role_access.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private refresh: RefreshTokenService,
    ) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      if (this.auth.isValidRefreshToken()) {
        this.refresh.renewAccessToken()
        .subscribe((data) => {
          console.log(data)
        }, (err) => {
          this.router.navigateByUrl('/auth');
          return false;
        });
        return true;
      }
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private role: RoleAccessService,
    private router: Router
  ) {}

  canActivate() {
    if (this.auth.isLoggedIn() && this.role.isHasAccess('supper-root-admin')) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
