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
    onKey(event: any) {
        // without type info
        this.values = event.target.value;
        this.req.requestHttp('get', `find/${this.values}`).subscribe(d => {
            this.ortUser = d;
        });
    }
}
