import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_core/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
    constructor(private auth: AuthenticationService, private route: Router) {}

    ngOnInit() {}
    logout() {
        this.auth.logout();
        this.route.navigateByUrl('/login');
    }
}
