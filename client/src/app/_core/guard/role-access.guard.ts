import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { RefreshTokenService } from './../services/token/refreshToken.service';
import { RoleAccessService } from '../services/role/role_access.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private role: RoleAccessService,
    private router: Router,
    private refresh: RefreshTokenService,
    ) {}

    canActivate() {
        if (!this.role.isHasAccess('supper-root-admin')) {
            this.router.navigateByUrl('/403');
            return false;
        }
        return true
    }
}
