import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicSearchPage } from './music-search';
import { MusicProvider } from '../../../providers/music/music';


@NgModule({
  declarations: [
    MusicSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicSearchPage),
  ],
  providers: [
    MusicProvider
  ]
})
export class MusicSearchPageModule {}
