import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NewfeedComponent } from './_view/page/newfeed/newfeed.component';
import { AuthComponent } from './_view/page/auth/auth.component';
import { TimelineComponent } from './_view/page/timeline/timeline.component';
import { AlbumComponent } from './_view/page/timeline/album/album.component';
import { MainComponent } from './_view/page/timeline/main/main.component';
import { MainLayoutComponent } from './_view/page/main-layout/main-layout.component';
import { VideoComponent } from './_view/page/timeline/video/video.component';
import { FriendComponent } from './_view/page/timeline/friend/friend.component';
import { MessagesComponent } from './_view/page/messages/messages.component';
import { MainModule } from './_view/page/main-layout/main/main.module';
import {
    AuthGuardService,
    LoginGuardService,
} from './_core/guard/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuardService],
        loadChildren: './_view/page/main-layout/main/main.module#MainModule',
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
