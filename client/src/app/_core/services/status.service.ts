import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class StatusService {
    status = [];
    comment = [];
    statusId = [];
    Istatus: BehaviorSubject<any>;
    Icomment: BehaviorSubject<any>;
    IstatusId: BehaviorSubject<any>;
    constructor() {
        this.Istatus = new BehaviorSubject(this.status);
        this.Icomment = new BehaviorSubject(this.comment);
        this.IstatusId = new BehaviorSubject(this.statusId);
    }
    addStatus(item) {
        if (this.status[item._id]) {
            // this.status[item._id].unshift(item);
        } else {
            this.status[item._id] = [item];
        }
    }
    addComment(item, comment) {
        if (this.comment[item._id]) {
            this.comment[item._id].unshift(comment);
        } else {
            this.comment[item._id] = [comment];
        }
    }
    addCommentwithID(id, comment) {
        if (this.comment[id]) {
            this.comment[id].unshift([comment]);
        } else {
            this.comment[id] = [[comment]];
        }
    }
    addStatusId(id) {
        this.statusId.unshift(id);
    }
}
