import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';


@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class MusicPage {

  music: any;

  params: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public musicProvider: MusicProvider
  ) {
    this.music = {
      searchlist: [],
      CloudFeatureRankingArray: [], // 云音乐特色榜
      GlobalMediaRankingArray: [], // 云音乐全球媒体榜
    };

    this.params = {
      
    }
  }

  ionViewDidLoad() {
    console.log('get ranking')
    // 获取云音乐特色榜单
    this.getCloudFeatureRanking();
    // 获取云音乐全球媒体榜
    this.getGlobalMediaRanking();
  }

  /*****
  *  跳转搜索页面 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  goSearch() {
    this.navCtrl.push('MusicSearchPage');
  }

  /*****
  *  云音乐特色榜 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getCloudFeatureRanking(){
    // 飙升榜,热歌榜,新歌榜,原创榜
    let featureArr = [19723756,3778678,3779629,2884035];
    featureArr.forEach((id) => {
      let param = {
        id: id
      }
      this.musicProvider.getRanking(param)
          .subscribe((res)=>{
            console.log(res)
            if(res['code']===200){
              this.music.CloudFeatureRankingArray.push(res['playlist']);
            }
          })
    });
  }

  /*****
  *  获取全球媒体榜
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getGlobalMediaRanking(){
    let GlobalMediaArr = [
      1978921795,991319590,10520166,   // 电音榜,嘻哈榜,新电力榜
      71385702,71384707,180106,        // ACG,古典音乐榜,UK
      60198,3812895,27135204,          // 美国Billboard周榜,Beatport全球电子舞曲榜,法国NRJVosHits周榜
      21845217,11641012,60131,         // KTV唛榜,iTunes榜,日本Oricon周榜
      120001,112463,112504,            // Hit FM Top榜,台湾Hito排行榜,中国TOP排行榜（港台榜）
      64016,10169002,1899724           // 中国TOP排行榜（内地榜）,香港电台中文歌曲龙虎榜,中国嘻哈榜
    ];         
    GlobalMediaArr.forEach((id) => {
      let param = {
        id: id
      }
      this.musicProvider.getRanking(param)
          .subscribe((res)=>{
            console.log(res)
            if(res['code']===200){
              this.music.GlobalMediaRankingArray.push(res['playlist']);
            }
          })
    });
  }

  /*****
  *  跳转榜单详情页 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  hrefRankingDetail(ranking){
    this.navCtrl.push('RankingDetailPage',{ranking:ranking})
  }

}
