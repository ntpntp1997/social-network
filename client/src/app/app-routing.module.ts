import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewfeedComponent } from './_view/page/newfeed/newfeed.component';
import { AuthComponent } from './_view/page/auth/auth.component';
import { TimelineComponent } from './_view/page/timeline/timeline.component';
import { AlbumComponent } from './_view/page/timeline/album/album.component';
import { MainComponent } from './_view/page/timeline/main/main.component';
import { MainLayoutComponent } from './_view/page/main-layout/main-layout.component';
import { VideoComponent } from './_view/page/timeline/video/video.component';
import { FriendComponent } from './_view/page/timeline/friend/friend.component';
import { MessagesComponent } from './_view/page/messages/messages.component';
import {
    AuthGuardService,
    LoginGuardService,
} from './_core/guard/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: NewfeedComponent,
            },
            {
                path: 'profile/:id',
                component: TimelineComponent,
                children: [
                    {
                        path: '',
                        component: MainComponent,
                    },
                    {
                        path: 'album',
                        component: AlbumComponent,
                    },
                    {
                        path: 'video',
                        component: VideoComponent,
                    },
                    {
                        path: 'friends',
                        component: FriendComponent,
                    },
                ],
            },
            {
                path: 'message',
                component: MessagesComponent,
            },
        ],
    },
    {
        path: 'login',
        canActivate: [LoginGuardService],
        component: AuthComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
