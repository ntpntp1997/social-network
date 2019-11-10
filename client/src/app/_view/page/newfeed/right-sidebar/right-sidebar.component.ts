import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from '../../../../_base/services/request_base/requestJWT.service';

@Component({
    selector: 'app-right-sidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
    public friendlist = [];
    constructor(private req: RequestJWTService) {}

    ngOnInit() {
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
