import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from '../../../../../_base/services/request_base/requestJWT.service';
import { AuthenticationService } from '../../../../../_core/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-status-content',
    templateUrl: './status-content.component.html',
    styleUrls: ['./status-content.component.css'],
})
export class StatusContentComponent implements OnInit {
    public comment = [];
    public status = [];
    public UserInfo;
    public key;
    constructor(
        private req: RequestJWTService,
        private auth: AuthenticationService,
        private route: Router
    ) {
        this.getStatus();
    }

    ngOnInit() {
        this.getUserInfo();
    }
    getUserInfo() {
        this.key = this.auth.getUserDetailsWithToken();
        this.req.requestHttp('get', `users/${this.key.id}`).subscribe(
            data => {
                this.UserInfo = data;
            },
            err => {
                this.route.navigateByUrl('/');
                console.log(err);
            }
        );
    }
    getStatus() {
        this.req.requestHttp('get', '/status').subscribe(
            data => {
                console.log(data);
                data.forEach(item => {
                    const body = {
                        status_id: item._id,
                    };
                    this.req
                        .requestHttp('post', 'likecheck', body)
                        .subscribe(kq => {
                            item.liked = kq;
                            this.status.push(item);
                            console.log(this.status);
                            this.req
                                .requestHttp(
                                    'get',
                                    `/comment/status/${item._id}`
                                )
                                .subscribe(
                                    comment => {
                                        if (this.comment[item._id]) {
                                            this.comment[item._id].push(
                                                comment
                                            );
                                        } else {
                                            this.comment[item._id] = [comment];
                                        }
                                        console.log(this.comment[item._id]);
                                    },
                                    err => {
                                        // if (this.comment[item._id]) {
                                        //     this.comment[item._id].push(err.error.text);
                                        // } else {
                                        //     this.comment[item._id] = [err.error.text];
                                        // }
                                        // console.log(this.comment[item._id]);
                                    }
                                );
                        });
                });
            },
            err => {
                console.log(err);
            }
        );
    }
    like(id) {
        const a = {
            status_id: id,
        };
        this.req.requestHttp('post', 'like/status', a).subscribe(data => {
            location.reload();
        });
    }
}
