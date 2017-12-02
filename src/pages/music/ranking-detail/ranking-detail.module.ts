import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingDetailPage } from './ranking-detail';
import { MusicProvider } from '../../../providers/music/music';


@NgModule({
  declarations: [
    RankingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RankingDetailPage),
  ],
  providers: [
    MusicProvider
  ]
})
export class RankingDetailPageModule {}
