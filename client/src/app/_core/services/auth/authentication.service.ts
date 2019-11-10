import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { RequestJWTService } from '../../../_base/services/request_base/requestJWT.service';

export interface UserDetails {
    _id: string;
    email: string;
    username: string;
    exp: number;
    iat: number;
}

interface TokenResponse {
    token: string;
    exp: number;
    refreshToken: string;
}

export interface TokenPayload {
    username: string;
    password: string;
    name?: string;
}

@Injectable()
export class AuthenticationService {
    private token: string;
    private refreshToken: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private req: RequestJWTService
    ) {}

    private saveToken(token: string, refreshToken: string): void {
        localStorage.setItem('mean-token', token);
        localStorage.setItem('refresh-token', refreshToken);
        this.token = token;
        this.refreshToken = refreshToken;
    }

    private resaveToken(token: string): void {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }

    private getRefreshToken(): string {
        if (!this.refreshToken) {
            this.refreshToken = localStorage.getItem('refresh-token');
        }
        return this.refreshToken;
    }

    public getUserDetailsWithRefreshToken(): UserDetails {
        const refreshToken = this.getRefreshToken();
        let payload;
        if (refreshToken) {
            payload = refreshToken.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public getUserDetailsWithToken(): UserDetails {
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
    public getUserInfo(UserInfo) {
        const a: UserDetails = this.getUserDetailsWithToken();
        this.req.requestHttp('get', `users/${a._id}`).subscribe(data => {
            UserInfo = data;
        });
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetailsWithToken();
        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public isValidRefreshToken(): boolean {
        const user = this.getUserDetailsWithRefreshToken();
        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    private request(
        method: 'post' | 'get',
        type: 'login' | 'register' | 'profile',
        user?: TokenPayload
    ): Observable<any> {
        let base;
        let headers = new HttpHeaders();
        headers = headers.set(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=utf-8'
        );
        if (method === 'post') {
            base = this.http.post(`/api/${type}`, user);
        } else {
            base = this.http.get(`/api/${type}`, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            });
        }

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token && data.refreshToken) {
                    this.saveToken(data.token, data.refreshToken);
                }
                return data;
            })
        );

        return request;
    }

    public register(user: TokenPayload): Observable<any> {
        return this.request('post', 'register', user);
    }

    public login(user: TokenPayload): Observable<any> {
        return this.request('post', 'login', user);
    }

    public profile(): Observable<any> {
        return this.request('get', 'profile');
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        window.localStorage.removeItem('refresh-token');
        this.router.navigateByUrl('/');
    }
}
