import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MusicProvider } from '../../../providers/music/music';

@IonicPage()
@Component({
  selector: 'page-music-search',
  templateUrl: 'music-search.html',
})
export class MusicSearchPage {

  search: any;

  param: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public musicProvider: MusicProvider
  ) {
    this.search = {
      txt: '',
      stroge: true,  // 默认显示本地存储里的搜索数据
      searchlist: [],
      listend: false,
      strogeList:[]  // 存储本地存储里的搜索数据
    }

    this.param = {
      type: 'search',
      text: '',
      offset: 0,
      limit: 20,
      songCount: '',
    }

  }

  ionViewDidLoad() {
    // 从本地存储中获取历史记录
    this.getStrogeData();
    // console.log('ionViewDidLoad MusicSearchPage');
  }


  /*****
  *  从本地存储中获取历史记录 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getStrogeData(){
    if(JSON.parse(localStorage.getItem('streamSearchMusic'))){
      this.search.strogeList = JSON.parse(localStorage.getItem('streamSearchMusic'));
    }
  }

  /*****
  *  搜索数据写入本地存储 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  setStrogeData(arr){
    localStorage.setItem('streamSearchMusic',JSON.stringify(arr))
  }

  /*****
  *  获取每日飙升榜单 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  searchID(e){
    console.log(e)
    if(e.keyCode == '13'){
      // 切换本地存储列表为搜索列表
      this.search.stroge = false;
      // 把搜索历史存入本地存储
      this.search.strogeList.push(this.param.text);
      this.setStrogeData(this.search.strogeList);
      // 清空已有数组
      this.search.searchlist = [];
      // 搜索
      this.searchFunction(this.param,'');
    }

  }

  /*****
  *  历史记录快速搜索 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  strogeSearch(txt) {
    this.param.text = txt;
    // 清空已有数组
    this.search.searchlist = [];
    // 搜索
    this.searchFunction(this.param,'');
    // 切换到搜索列表
    this.search.stroge = false;
  }

  /*****
  *  清楚本地存储数据 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  clearStrogeData(e){
    e.stopPropagation();

    this.search.strogeList = [];
    this.setStrogeData(this.search.strogeList);

  }

  /*****
  *  搜索 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  searchFunction(param,e){
    this.musicProvider.searchID(param)
        .subscribe((res)=>{
          console.log(res)
          if(res){
            res['result']['songs'].forEach((music) => {
              this.search.searchlist.push(music)
            });
            this.param.songCount = res['result']['songCount']; // 搜索总数
            this.param.maxOffset = this.param.songCount / 20;  // 计算总的分页

            if(e){
              e.complete();
            }

          }

        })
  }

  /*****
  *  根据当前音乐的id 获取音乐 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getMusic(music){
    // type=song&id=185809&br=128000 彩虹
    // let param = {
    //   type: 'song',
    //   id: music['id'],
    //   br: 320000
    // }
    // 把当前的列表传递过去，自动播放下一曲
    this.navCtrl.push('MusicDetailPage',{music:music,list:this.search.searchlist});
  }

  /*****
  *  上拉请求数据 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  ionInfiniteGetData(e) {
    console.log(e)
    let pag = this.param.offset + 1;
    if(pag <= this.param.maxOffset){
      // 页码加1；
      this.param.offset = pag;
      // 加载数据
      console.log(this.param)
      this.searchFunction(this.param,e);
    }else{
      this.search.listend = true;
    }
    
  }

}
