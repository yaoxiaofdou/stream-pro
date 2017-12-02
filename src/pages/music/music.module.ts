import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';
import { MusicProvider } from '../../providers/music/music';

@NgModule({
  declarations: [
    MusicPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicPage),
  ],
  providers: [
    MusicProvider
  ]
})
export class MusicPageModule {}
