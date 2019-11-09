import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root',
})
export class SocketIOService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages() {
        return Observable.create(observer => {
            this.socket.on('new-message', message => {
                observer.next(message);
            });
        });
    }

    public getUserConnect() {
        return Observable.create(observer => {
            this.socket.on('user-connect', message => {
                observer.next(message);
            });
        });
    }
}
