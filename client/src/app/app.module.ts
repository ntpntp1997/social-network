import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsListComponent } from './_view/page/friends-list/friends-list.component';
import { NotiticationsComponent } from './_view/page/notitications/notitications.component';
import { MessagesComponent } from './_view/page/messages/messages.component';
import { FriendComponent } from './_view/page/timeline/friend/friend.component';
import { AlbumComponent } from './_view/page/timeline/album/album.component';
import { VideoComponent } from './_view/page/timeline/video/video.component';
import { MainComponent } from './_view/page/timeline/main/main.component';
import { NewfeedComponent } from './_view/page/newfeed/newfeed.component';
import { TimelineComponent } from './_view/page/timeline/timeline.component';
import { LeftSidebarComponent } from './_view/page/newfeed/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './_view/page/newfeed/right-sidebar/right-sidebar.component';
import { MainContentComponent } from './_view/page/newfeed/main-content/main-content.component';
import { PostStatusComponent } from './_view/page/newfeed/main-content/post-status/post-status.component';
import { StatusContentComponent } from './_view/page/newfeed/main-content/status-content/status-content.component';
import { HeaderComponent } from './_view/component/header/header.component';
import { AuthComponent } from './_view/page/auth/auth.component';
import { MainLayoutComponent } from './_view/page/main-layout/main-layout.component';
import { TopbarComponent } from './_view/component/topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './_core/services/auth/authentication.service';
import {
    AuthGuardService,
    LoginGuardService,
} from './_core/guard/auth-guard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainModule } from './_view/page/main-layout/main/main.module';

declare var $: any;
console.log(`jQuery version: ${$.fn.jquery}`);
@NgModule({
    declarations: [
        AppComponent,
        NewfeedComponent,
        TimelineComponent,
        FriendsListComponent,
        NotiticationsComponent,
        MessagesComponent,
        FriendComponent,
        AlbumComponent,
        VideoComponent,
        MainComponent,
        LeftSidebarComponent,
        RightSidebarComponent,
        MainContentComponent,
        PostStatusComponent,
        StatusContentComponent,
        HeaderComponent,
        AuthComponent,
        MainLayoutComponent,
        TopbarComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [AuthenticationService, AuthGuardService, LoginGuardService],
    bootstrap: [AppComponent],
})
export class AppModule {}
