import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../_core/services/userInfo.service';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
    values = '';
    key;
    public user;
    public m;
    public ortUser;
    public isDataAvailable = false;
    constructor(
        private req: RequestJWTService,
        private auth: AuthenticationService,
        private route: Router,
        private userS: UserInfoService
    ) {}

    async ngOnInit() {
        this.userS.IuserInfo.subscribe(d => {
            this.user = d;
        });
        this.user = await this.getUserInfo();
        console.log(this.user);
    }
    getUserInfo() {
        return new Promise((resolve, reject) => {
            this.key = this.auth.getUserDetailsWithToken();
            this.req.requestHttp('get', `users/${this.key.id}`).subscribe(
                data => {
                    this.user = data;
                    this.isDataAvailable = true;
                    resolve(data);
                    console.log(this.user);
                },
                err => {
                    this.route.navigateByUrl('/');
                    console.log(err);
                    return reject(err);
                }
            );
        });
    }
    clear() {
        this.m = '';
        this.values = '';
        this.ortUser = [];
        $('.ass').hide();
    }
    onKey(event: any) {
        // without type info
        this.ortUser = [];
        $('.ass').hide();
        this.values = event.target.value;
        this.req.requestHttp('get', `find/${this.values}`).subscribe(d => {
            this.ortUser = d;
            if (this.ortUser) {
                $('.ass').show();
            } else {
                $('.ass').hide();
            }
        });
    }
}
