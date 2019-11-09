import { Component, OnInit } from '@angular/core';
import {
    TokenPayload,
    AuthenticationService,
} from 'src/app/_core/services/auth/authentication.service';
import { Router } from '@angular/router';

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

    constructor(private auth: AuthenticationService, private router: Router) {}

    login() {
        this.auth.login(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/');
            },
            err => {
                console.error(err);
            }
        );
    }
    ngOnInit() {}
}
