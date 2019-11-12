import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { StatusService } from '../../../../_core/services/status.service';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
    constructor(
        private auth: AuthenticationService,
        private route: Router,
        private statusS: StatusService
    ) {}

    ngOnInit() {}
    logout() {
        this.auth.logout();
        this.statusS.clear();
        location.reload();
        this.route.navigateByUrl('/login');
    }
}
