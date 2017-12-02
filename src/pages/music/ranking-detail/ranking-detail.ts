import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MusicProvider } from '../../../providers/music/music';


@IonicPage()
@Component({
  selector: 'page-ranking-detail',
  templateUrl: 'ranking-detail.html',
})
export class RankingDetailPage {

  rankingDetail: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public musicProvider: MusicProvider
  ) {
    this.rankingDetail = {
      name: '',
      description: '',
      background: '',
      ranking: '',
      list: '',
    }
  }

  ionViewDidLoad() {
    this.rankingDetail.ranking = this.navParams['data']['ranking'];
    console.log(this.navParams['data'])
    console.log(this.rankingDetail.ranking)
    if(this.rankingDetail.ranking){
      this.rankingDetail.name = this.rankingDetail.ranking['name'];
      this.rankingDetail.description = this.rankingDetail.ranking['description'];
      this.rankingDetail.background = this.rankingDetail.ranking['coverImgUrl'];
      if(this.rankingDetail.ranking['tracks']){
        this.rankingDetail.list = this.rankingDetail.ranking['tracks'];
      }
    }
    // console.log('ionViewDidLoad RankingDetailPage');
  }
  
  /*****
  *  格式化 歌曲作者
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  formartAuther(autherList){
    return this.musicProvider.formartAuthor(autherList);
  }

  /*****
  *  跳转歌曲播放 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  hrefMusicDetial(music) {
    this.navCtrl.push('MusicDetailPage',{
      music:music,
      list:this.rankingDetail.list
    });
  }

}
