import { Injectable } from '@angular/core';
import { UserDetails } from './../auth/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class RoleAccessService {
    private token: string;
    constructor() {}

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }
    private getUserDetailsWithToken(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    // tslint:disable-next-line:ban-types
    public isHasAccess(role: string): Boolean {
        const user = this.getUserDetailsWithToken();
        if (user) {
            return user.role === role;
        }
        return true;
    }
}
