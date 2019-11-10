import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable({
    providedIn: 'root',
})
export class RequestJWTService {
    private token: string;
    constructor(private http: HttpClient) {}
    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }
    public requestHttp(
        method: 'get' | 'post' | 'put' | 'delete',
        type: string,
        body?
    ): Observable<any> {
        if (method === 'get') {
            return this.http.get(`api/${type}`, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            });
        }
        if (method === 'post') {
            return this.http.post(`api/${type}`, body, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            });
        }
        if (method === 'put') {
            return this.http.put(`api/${type}`, body, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            });
        }
        if (method === 'delete') {
            return this.http.delete(`api/${type}`, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            });
        }
    }
}
