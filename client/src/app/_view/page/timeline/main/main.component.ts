import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusService } from 'src/app/_core/services/status.service';
import _ from 'lodash';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    public comment = [];
    public status = [];
    public statusId = [];
    private paramss;
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
        private Arouter: ActivatedRoute
    ) {
        this.Arouter.params.subscribe(params => {
            this.paramss = params.id;
            this.ngOnInit();
            this.getStatus(); // reset and set based on new parameter this time
        });
    }

    ngOnInit() {
        this.getUserInfo();
        this.getStatus();
        console.log(this.Arouter.snapshot.params.id);
    }
    getUserInfo() {
        this.req.requestHttp('get', `users/${this.paramss}`).subscribe(
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
        this.comment = [];
        this.status = [];
        this.statusId = [];
        this.req.requestHttp('get', `/status/${this.paramss}`).subscribe(
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
                            this.statusId.unshift(item._id);
                            this.status[item._id] = [item];
                            this.req
                                .requestHttp(
                                    'get',
                                    `/comment/status/${item._id}`
                                )
                                .subscribe(
                                    comment => {
                                        comment.forEach(element => {
                                            if (this.comment[item._id]) {
                                                this.comment[item._id].unshift(
                                                    element
                                                );
                                            } else {
                                                this.comment[item._id] = [
                                                    element,
                                                ];
                                            }
                                        });

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
            if (this.comment[id]) {
                this.comment[id].unshift(d);
            } else {
                this.comment[id] = [d];
            }
            console.log(this.comment);
        });
    }
}
