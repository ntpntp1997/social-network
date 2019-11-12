import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../../_core/services/userInfo.service';
import { Router } from '@angular/router';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { StatusService } from '../../../_core/services/status.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
    public key;
    public UserInfo: any;
    public user;
    private paramss;
    dataAvible = false;
    public isUser: boolean;
    public friend;
    constructor(
        private userinfo: UserInfoService,
        private statusS: StatusService,
        private auth: AuthenticationService,
        private route: Router,
        private routeA: ActivatedRoute,
        private req: RequestJWTService
    ) {
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.routeA.params.subscribe(params => {
            this.paramss = params.id; // reset and set based on new parameter this time
        });
    }

    ngOnInit() {
        this.getUserInfo();
        this.statusS.clear();
    }
    addFriend(id) {
        alert(id);
        const body = {
            friend_id: id,
        };
        this.req.requestHttp('post', 'friends', body).subscribe(
            d => {
                console.log(d);
                this.friend.status = d.status;
                console.log(this.friend);
            },
            e => {
                console.log(e);
            }
        );
    }
    getUserInfo() {
        this.key = this.auth.getUserDetailsWithToken();
        this.req.requestHttp('get', `users/${this.key.id}`).subscribe(
            data => {
                this.UserInfo = data;
                // tslint:disable-next-line:triple-equals
                if (this.UserInfo._id == this.routeA.snapshot.params.id) {
                    this.isUser = true;
                } else {
                    this.isUser = false;
                }
            },
            err => {
                this.route.navigateByUrl('/');
                console.log(err);
            }
        );
        this.req
            .requestHttp(
                'get',
                `statusfriend/${this.routeA.snapshot.params.id}`
            )
            .subscribe(
                d => {
                    console.log(d);
                    this.friend = d;
                },
                e => {
                    console.log(e);
                }
            );
        this.req
            .requestHttp('get', `users/${this.routeA.snapshot.params.id}`)
            .subscribe(
                data => {
                    this.user = data;
                    this.dataAvible = true;
                },
                err => {
                    this.route.navigateByUrl('/');
                    console.log(err);
                }
            );
    }
}
