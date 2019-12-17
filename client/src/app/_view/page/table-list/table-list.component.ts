import { Component, OnInit } from '@angular/core';
import { RequestJWTService } from './../../../_base/services/request_base/requestJWT.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
    user = [];
    constructor(private request: RequestJWTService, private route: Router) {}

    ngOnInit() {
        this.getAllUser();
    }

    delete(id) {
        console.log(id);
        this.request.requestHttp('delete', `users/${id}`).subscribe(
            data => {
                console.log(data);
                this.getAllUser();
            },
            err => {
                console.log(err);
                location.reload();
            }
        );
    }

    getAllUser() {
        this.user = [];
        this.request.requestHttp('get', 'users').subscribe(
            data => {
                console.log(data);
                data.forEach(element => {
                    this.user.push(element);
                });
            },
            err => {
                console.log(err);
                location.reload();
            }
        );
    }
}
