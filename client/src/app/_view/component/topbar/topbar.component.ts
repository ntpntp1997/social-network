import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from 'src/app/_base/services/request_base/requestJWT.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
    values = '';
    public m;
    public ortUser;
    constructor(private req: RequestJWTService) {}

    ngOnInit() {}
    clear() {
        this.m = '';
        this.values = '';
        this.ortUser = [];
        $('.ass').hide();
    }
    onKey(event: any) {
        // without type info
        this.ortUser = [];
        $('.ass').hide();
        this.values = event.target.value;
        this.req.requestHttp('get', `find/${this.values}`).subscribe(d => {
            this.ortUser = d;
            if (this.ortUser) {
                $('.ass').show();
            } else {
                $('.ass').hide();
            }
        });
    }
}
