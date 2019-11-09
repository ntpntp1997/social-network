import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

interface TokenResponse {
    token: string;
}
export interface RefreshTokenPay {
    refreshToken: string;
}
@Injectable({
    providedIn: 'root',
})
export class RefreshTokenService {
    private token: string;
    private refreshToken: string;
    constructor(private http: HttpClient) {}
    private resaveToken(token: string): void {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }
    private getRefreshToken(): string {
        if (!this.refreshToken) {
            this.refreshToken = localStorage.getItem('refresh-token');
            console.log(this.refreshToken);
        }
        return this.refreshToken;
    }
    private request(
        type: 'refreshtoken',
        refreshToken: RefreshTokenPay
    ): Observable<any> {
        let base;
        base = this.http.post(`/admin/${type}`, refreshToken);

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.resaveToken(data.token);
                }
                return data;
            })
        );

        return request;
    }
    public renewAccessToken(): Observable<any> {
        const refreshToken: RefreshTokenPay = {
            refreshToken: this.getRefreshToken(),
        };
        return this.request('refreshtoken', refreshToken);
    }
}
