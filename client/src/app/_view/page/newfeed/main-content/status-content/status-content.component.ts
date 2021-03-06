import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from '../../../../../_base/services/request_base/requestJWT.service';
import { AuthenticationService } from '../../../../../_core/services/auth/authentication.service';
import { Router } from '@angular/router';
import _ from 'lodash';
import { StatusService } from '../../../../../_core/services/status.service';

@Component({
    selector: 'app-status-content',
    templateUrl: './status-content.component.html',
    styleUrls: ['./status-content.component.css'],
})
export class StatusContentComponent implements OnInit {
    public comment = [];
    public status = [];
    public statusId = [];
    public UserInfo;
    public key;
    public show;
    public bo = {
        status_id: '',
        content: '',
    };
    constructor(
        private req: RequestJWTService,
        private auth: AuthenticationService,
        private route: Router,
        private statusS: StatusService
    ) {}

    ngOnInit() {
        this.getStatus();
        this.statusS.IstatusId.subscribe(d => {
            this.statusId = d;
        });
        this.statusS.Icomment.subscribe(d => {
            this.comment = d;
        });
        this.statusS.Istatus.subscribe(d => {
            this.status = d;
        });
        this.getUserInfo();
    }
    public share(item) {
        this.statusId.push(item._id);
        this.status[item._id] = [item];
        this.reload();
    }
    reload() {
        this.show = false;
        console.log(this.show);
        this.getStatus();
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
                            this.statusS.addStatus(item);
                            this.statusS.addStatusId(item._id);
                            this.req
                                .requestHttp(
                                    'get',
                                    `/comment/status/${item._id}`
                                )
                                .subscribe(
                                    comment => {
                                        this.statusS.addComment(item, comment);
                                        this.show = true;

                                        console.log(this.comment);
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
            // tslint:disable-next-line:triple-equals
            if (this.status[id][0].liked) {
                _.update(this.status[id][0], 'like_amount', n => n - 1);
                _.update(this.status[id][0], 'liked', n => (n = false));
            } else {
                _.update(this.status[id][0], 'like_amount', n => n + 1);
                _.update(this.status[id][0], 'liked', n => (n = true));
            }
        });
    }
    onKey(event: any) {
        this.bo.content = event.target.value;
    }
    commentStatus(id) {
        this.bo.status_id = id;
        this.req.requestHttp('post', 'comment', this.bo).subscribe(d => {
            this.statusS.addCommentwithID(id, d);
            console.log(this.comment);
            _.update(this.status[id][0], 'comment_amount', n => n + 1);
        });
        this.bo.content = '';
    }
}
