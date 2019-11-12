import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from '../../../../_base/services/request_base/requestJWT.service';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';

@Component({
    selector: 'app-right-sidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
    public friendlist = [];
    public me;
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
            },
            err => {
                console.log(err);
            }
        );
    }
}
