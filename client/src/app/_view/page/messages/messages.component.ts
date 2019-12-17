import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
    public friendlist = [];
    public me;
    public text;
    info;
    mess = new Array();
    constructor(
        private req: RequestJWTService,
        private auth: AuthenticationService
    ) {}

    ngOnInit() {
        this.me = this.auth.getUserDetailsWithToken();
        this.req.requestHttp('get', '/list').subscribe(
            data => {
                this.friendlist = data;
                console.log(this.friendlist);
                console.log(this.me.id);
            },
            err => {
                console.log(err);
            }
        );
    }
    chose(relationshipid) {
        this.req.requestHttp('get', `friends/${relationshipid}`).subscribe(
            d => {
                this.info = d;
            },
            e => {
                console.log(e);
            }
        );
        this.req.requestHttp('get', `message/${relationshipid}`).subscribe(
            d => {
                console.log(d);
                this.mess = d;
            },
            e => {
                console.log(e);
            }
        );
    }
    chat(relationshipid) {
        let receiverid;
        if (this.info.user_id === this.me.id) {
            receiverid = this.info.friend_id;
        } else {
            receiverid = this.info.user_id;
        }
        const body = {
            conversation_id: relationshipid,
            receiver_id: receiverid,
            text: this.text,
        };
        this.req.requestHttp('post', 'message', body).subscribe(
            d => {},
            e => {}
        );
    }
}
