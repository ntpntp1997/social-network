import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NewfeedComponent } from '../../newfeed/newfeed.component';
import { TimelineComponent } from '../../timeline/timeline.component';
import { AlbumComponent } from '../../timeline/album/album.component';
import { VideoComponent } from '../../timeline/video/video.component';
import { FriendComponent } from '../../timeline/friend/friend.component';
import { MessagesComponent } from '../../messages/messages.component';
import { MainaComponent } from '../../timeline/main/main.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NewfeedComponent,
    },
    {
        path: 'user/profile/:id',
        component: TimelineComponent,
        children: [
            {
                path: '',
                component: MainaComponent,
            },
            {
                path: 'album/:id',
                component: AlbumComponent,
            },
            {
                path: 'video/:id',
                component: VideoComponent,
            },
            {
                path: 'friends/:id',
                component: FriendComponent,
            },
        ],
    },
    {
        path: 'message',
        component: MessagesComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [MainComponent],
})
export class MainModule {}
