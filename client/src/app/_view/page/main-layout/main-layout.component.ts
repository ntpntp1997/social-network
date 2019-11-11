import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/_core/services/status.service';
import { UserInfoService } from '../../../_core/services/userInfo.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
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
        private statusS: StatusService,
        private userS: UserInfoService
    ) {
        this.statusS.IstatusId.subscribe(d => {
            this.statusId = d;
        });
        this.statusS.Icomment.subscribe(d => {
            this.comment = d;
        });
        this.statusS.Istatus.subscribe(d => {
            this.status = d;
        });
        this.userS.IuserInfo.subscribe(d => {
            this.UserInfo = d;
        });
        this.getUserInfo();
    }
    ngOnInit() {
        this.getUserInfo();
        this.getStatus();
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
                this.userS.getUserInfo(data);
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
}
