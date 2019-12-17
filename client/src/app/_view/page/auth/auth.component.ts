import { Component, OnInit } from '@angular/core';
import {
    TokenPayload,
    AuthenticationService,
} from 'src/app/_core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    credentials: TokenPayload = {
        username: '',
        password: '',
    };
    res = false;
    dataRes = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
    };

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private req: RequestJWTService
    ) {}

    login() {
        this.auth.login(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/');
            },
            err => {
                console.error(err);
                alert('Đăng nhập thất bại');
            }
        );
    }
    register() {
        this.req.requestHttp('post', 'users', this.dataRes).subscribe(
            d => {
                this.credentials.username = this.dataRes.username;
                this.credentials.password = this.dataRes.password;
                this.login();
            },
            e => {
                console.log(e);
                alert(e);
            }
        );
    }
    change() {
        if (this.res === false) {
            $('.sign').hide();
            $('.reg').show();
            this.res = true;
        } else {
            $('.sign').show();
            $('.reg').hide();
            this.res = false;
        }
    }
    ngOnInit() {}
}
