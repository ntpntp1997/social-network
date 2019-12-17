import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { RequestJWTService } from '../../../../../_base/services/request_base/requestJWT.service';
import { Router } from '@angular/router';
import { StatusContentComponent } from '../status-content/status-content.component';
import { StatusService } from '../../../../../_core/services/status.service';

@Component({
    selector: 'app-post-status',
    templateUrl: './post-status.component.html',
    styleUrls: ['./post-status.component.css'],
})
export class PostStatusComponent implements OnInit {
    public friendlist = [];
    public key;
    public user: any;
    fileData: File = null;
    sstatus = {
        content: '',
    };
    constructor(
        private auth: AuthenticationService,
        private req: RequestJWTService,
        private route: Router,
        private stasusS: StatusService
    ) {
        this.getUserInfo();
        this.req.requestHttp('get', '/list').subscribe(
            data => {
                this.friendlist = data;
                console.log(this.friendlist);
            },
            err => {
                console.log(err);
            }
        );
    }
    fileProgress(fileInput: any) {
        // tslint:disable-next-line:whitespace && no-angle-bracket-type-assertion
        this.fileData = <File>fileInput.target.files[0];
        console.log(this.fileData);
    }
    getUserInfo() {
        this.key = this.auth.getUserDetailsWithToken();
        this.req.requestHttp('get', `users/${this.key.id}`).subscribe(
            data => {
                this.user = data;
            },
            err => {
                this.route.navigateByUrl('/');
                console.log(err);
            }
        );
    }
    onSubmit() {
        const formData = new FormData();
        formData.append('file', this.fileData);
        formData.append('content', this.sstatus.content);
        this.req.requestHttp('post', 'status', formData).subscribe(res => {
            this.sstatus.content = '';
            res.liked = false;
            this.stasusS.addStatus(res);
            this.stasusS.addStatusId(res._id);
        });
        this.friendlist.forEach(element => {
            let id;
            // tslint:disable-next-line:triple-equals
            if (element.user_id == this.user._id) {
                id = element.friend_id;
            } else {
                id = element.user_id;
            }
            const noti = {
                receiver_id: id,
                content: 'Đã đăng bài viết mới',
            };
            this.req.requestHttp('post', 'notification', noti).subscribe(
                d => {},
                e => {}
            );
        });
    }
    ngOnInit() {}
}
