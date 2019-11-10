import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { RefreshTokenService } from './../services/token/refreshToken.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private refresh: RefreshTokenService
    ) {}

    canActivate() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate() {
        if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}
