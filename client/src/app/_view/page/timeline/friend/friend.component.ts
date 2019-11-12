import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import _ from 'lodash';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {
    public friendCount: number;
    public reqCount: number;
    public friendlist = [];
    public reqlist = [];
    public me;
    dataIsReady = false;
    constructor(
        private req: RequestJWTService,
        private auth: AuthenticationService
    ) {}

    ngOnInit() {
        this.getFriendList();
        this.me = this.auth.getUserDetailsWithToken();
    }
    getFriendList() {
        this.req.requestHttp('get', 'list').subscribe(d => {
            this.friendlist = d;
            this.friendCount = _.size(this.friendlist);
        });
        this.req.requestHttp('get', 'reqlist').subscribe(d => {
            this.reqlist = d;
            this.reqCount = _.size(this.reqlist);
            this.dataIsReady = true;
        });
    }
    acceptFriend(itemid) {
        const body = {
            status: 'friend',
        };
        this.req.requestHttp('put', `friends/${itemid}`, body).subscribe(
            d => {
                console.log(d);
            },
            e => {
                console.log(e);
            }
        );
    }
}
