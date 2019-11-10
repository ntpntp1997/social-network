import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import { AuthenticationService } from './auth/authentication.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    key;
    userInfo;
    IuserInfo: BehaviorSubject<any>;
    constructor() {
        this.IuserInfo = new BehaviorSubject(this.userInfo);
    }
    getUserInfo(item) {
        this.userInfo = item;
        console.log(this.userInfo);
    }
}
