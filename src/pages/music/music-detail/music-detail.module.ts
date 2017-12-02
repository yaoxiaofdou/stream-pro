import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicDetailPage } from './music-detail';
import { MusicProvider } from '../../../providers/music/music';
import { VideoComponent } from '../../../components/video/video';


@NgModule({
  declarations: [
    MusicDetailPage,
    VideoComponent,
  ],
  imports: [
    IonicPageModule.forChild(MusicDetailPage),
  ],
  providers: [
    MusicProvider
  ]
})
export class MusicDetailPageModule {}
