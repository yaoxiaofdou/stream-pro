import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MusicProvider } from '../../../providers/music/music';

@IonicPage()
@Component({
  selector: 'page-music-detail',
  templateUrl: 'music-detail.html',
})
export class MusicDetailPage {

  music: any;

  // 进度条控制
  progressBar: any;

  loadingC: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public musicProvider: MusicProvider
  ) {
    this.music = {
      mode: 1, // 1: MP3  2:MV
      nodeList: [], // 存储当前播放的按钮
      item:{},
      searchList: [], // 存储传递过来的歌曲列表数组
      musicIndex: '', // 存储当前播放的歌曲的序号
      name: '',  // 歌曲名
      sing: '',  // 演唱者
      img: '',
      bg: '',    // 歌曲背景图
      url: '',    // MP3
      mvUrl: '',  // MV
      play: false, // 控制歌曲是否播放，默认否
      thisLyric: '',
    }
    this.progressBar = {
      defaultSum: 0,
      timer: '',
      sum: 0,
      width: 0,
      date: '',
      sumDate: '',
      showList: true,  // 控制歌曲目录显示
    }
  }

  ionViewDidLoad() {

    this.music.item = this.navParams['data']['music'];
    this.music.searchList = this.navParams['data']['list'];
    
    console.log(this.music.item)
    console.log(this.music.searchList)

    if(this.music.item){
      // 根据id获取音乐详情
      console.log(this.music.item);
      this.setBody(this.music.item);
      // 默认获取一次 当前歌曲的索引位置
      this.music.musicIndex = this.getMusicIndex(this.music.item,this.music.searchList) + 1;

      // 过滤出当前歌曲的种类 mp3 mv
      if(this.music.item['id']){
        this.music.nodeList.push({
          id: 'node001',
          name: 'MP3',
          mode: 1
        })
      }
      if(this.music.item['mv']){
        this.music.nodeList.push({
          id: 'node002',
          name: 'MV',
          mode: 2
        })
      }
      
      

    }

    let that = this;

    // 音乐播放器
    let audio = document.getElementById('ytAudio');
    // 歌词容器
    let lyricPanel = document.getElementById('lyricPanel');

    // 歌曲准备就绪开始播放
    audio.addEventListener('durationchange',()=>{
      that.progressBar.sum = Math.floor(audio['duration']);
      console.log('音乐总长时间',that.progressBar.sum)
      // 设置歌曲总时间
      that.progressBar.sumDate = that.formartMusicDate(that.progressBar.sum);
      // 重新制作时间定时
      if(audio['duration']){
        this.sumTimerFun();
      }

    });

    // 歌曲结束播放
    audio.addEventListener('ended',()=>{
      console.log('music end')
      // 关闭播放按钮
      that.music.play = false;
      // 获取下一首歌曲 , 在这其实可以判断当前播放模式
      that.getNextMusic();
    });

    audio.addEventListener('timeupdate',()=>{
      
      that.progressBar.width = Math.floor(audio['currentTime']) / Math.floor(that.progressBar.sum);
      that.progressBar.width = that.progressBar.width.toFixed(2) * 100 + '%';
      // console.log('播放时间',audio['currentTime'])
      // 计算歌词位置
      // 00:29  对比 [00:29.994]
      let lyricObj = that.loopThisLyric(that.music.lyric,that.progressBar.date);
      if(lyricObj){
        // console.log(lyricObj)
        // 去除旧的歌词印记
        that.music.lyric.forEach((item)=>{item['isActive'] = false;});
        // 新的歌词添加印记
        lyricObj['isActive'] = true;
        // 成功后，获取当前歌词的 dom ,改变容器 top
        if(document.getElementsByClassName('lyric--active')[0]){
          let domSc = document.getElementsByClassName('lyric--active')[0];
          lyricPanel['scrollTop'] = domSc['offsetTop'] - ((document.querySelector('#lyricPanel')['offsetTop'] - document.documentElement.scrollTop)+48);
        }
      }
    });
  }

  /*****
  *  设置当前歌曲界面信息 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  setBody(item){
    // 格式化基础歌曲信息
    this.music.name = item['name'];
    this.music.img = item['al']['picUrl'];
    this.music.sing = item['ar'][0]['name'];
    this.music.bg = 'url(' + item['al']['picUrl'] + ')';
    
    // 格式化时间
    this.progressBar.defaultSum = 0;
    this.progressBar.sum = 0;
    this.progressBar.width = 0;
    this.progressBar.date = '';
    this.progressBar.sumDate = '';

    // 设置歌曲图标
    this.setListPlay(this.music.item,this.music.searchList);

    this.getMusic(item)
  }

  /*****
  *  改变 歌曲模式 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  changeMusicMode(mode){
    this.music.mode = mode - 0;

    console.log(this.music.item)
    // 1 请求 MP3
    if(mode == 1){
      let param = {
        type: 'song',
        id: this.music.item['id'],
        br: 320000
      }
      // 链接服务器搜索
      this.search(param,'song');
    }
    // 2 请求 MV
    if(mode == 2){
      let param = {
        type: 'mv',
        id: this.music.item['mv'],
        br: 320000
      }
      // 链接服务器搜索
      this.search(param,'mv');
    }
  }

  /*****
  *  进度条计时 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  sumTimerFun(){
    this.progressBar.timer = setTimeout(()=>{
      if(this.progressBar.defaultSum == this.progressBar.sum){
        clearInterval(this.progressBar.timer);
      }else {
        this.progressBar.defaultSum++;
        this.progressBar.date = this.formartMusicDate(this.progressBar.defaultSum);
        this.sumTimerFun();
      }
    },1000)
  }

  /*****
  *  格式化时间 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  formartMusicDate(date){
    let time;
    let mm,ss;
    if(date >= 60){
      mm = Math.floor(date / 60);
      ss = date % 60;
    }else {
      mm = '00'
      ss = date % 60;
    }
    // 少于 10 补 0
    if(ss < 10){
      time = `${mm}:0${Math.floor(ss)}`;
    }else{
      time = `${mm}:${Math.floor(ss)}`;
    }
    return time;
  }

  /*****
  *  遍历寻找当前歌词 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  loopThisLyric(arr,date){
    let obj = '';
    if(arr){
      for(let i = 0;i<arr.length;i++){
        if(arr[i]['date'].match(eval('/'+date+'/g'))){
          obj = arr[i];
          break;
        }
      }
    }
    // 如果有则代表又歌词，返回
    return obj;
  }

  /*****
  *  根据id获取音乐详情 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getMusic(music){
    let param = {
      type: 'song',
      id: music['id'],
      br: 320000
    }
    // 链接服务器搜索
    this.search(param,'song');
    // 搜索歌词
    this.getLyric(music);
  }

  /*****
  *  根据id获取音乐歌词 1006 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getLyric(music){
    let param = {
      type: 'lyric',
      id: music['id']
    }
    // 链接服务器搜索
    this.search(param,'lyric');
  }

  /*****
  *  获取前一首歌
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getParentMusic() {
    // 暂停原歌曲
    this.pause(document.getElementById('ytAudio'));
    // 下一首后自动开启播放按钮
    this.music.play = true;
    // 获取当前歌曲的index
    let index = this.getMusicIndex(this.music.item,this.music.searchList);
    // 存储序号
    this.music.musicIndex = index;
    // console.log(index)
    // 切换界面显示
    if(index > 0){
      // 切到下一首
      this.music.item = this.music.searchList[index-1];
    }else {
      // 切到第一首
      this.music.item = this.music.searchList[this.music.searchList.length-1];
    }
    // 根据坐标搜索发送请求去寻找下一首
    this.setBody(this.music.item);
  }

  /*****
  *  获得下一首歌 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getNextMusic() {
    // 暂停原歌曲
    this.pause(document.getElementById('ytAudio'));
    // 下一首后自动开启播放按钮
    this.music.play = true;
    // 获取当前歌曲的index
    let index = this.getMusicIndex(this.music.item,this.music.searchList);
    // 存储序号
    this.music.musicIndex = index;
    // 切换界面显示
    if(index <= this.music.searchList.length){
      // 切到下一首
      this.music.item = this.music.searchList[index+1];
    }else {
      // 切到第一首
      this.music.item = this.music.searchList[0];
    }
    // 根据坐标搜索发送请求去寻找下一首
    this.setBody(this.music.item);
  }

  /*****
  *  抽取当前歌曲在数组中的位置 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getMusicIndex(music,list) {
    return list.findIndex(item=>item.id==music.id);
  }

  /*****
  *  显示当前列表中歌曲播放的图标 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  setListPlay(music,list){
    list.forEach((item) => {
      item['isPlay'] = false;
    });
    // 设置当前的音乐图标显示
    list.find(item=>item.id==music.id)['isPlay'] = true;
  }

  /*****
  *  loading component
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  loading(val,bool) {
    // "自动登录中,请稍后..."
    if(bool === 'true'){
      this.loadingC = this.loadingCtrl.create({
        content: val,
      });
      this.loadingC.present();
    }else{
      this.loadingC.dismiss();
    }
  }

  /*****
  *  链接服务器搜索 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  search(param,type){
    this.musicProvider.getMusic(param)
        .subscribe((res)=>{
          // console.log(res)
          if(res){
            // get歌曲
            if(type == 'song'){
              if(res['data'][0]){
                this.music.url = res['data'][0]['url'];
                // 设置状态为播放
                this.music.play = true;
              }
            }

            // get歌词
            if(type == 'lyric'){
              // uncollected 网易云这个字符貌似是用来返回没有歌词 (问题： nolyric and uncollected)
              // if(!res['uncollected']){

              // }
              if(res['uncollected'] || res['nolyric']){
                // 放空
              }else {
                this.music.lyric = res['lrc']['lyric'];
                // 格式化歌词
                this.music.lyric = this.forMartLyric(this.music.lyric);
                // console.log(this.music.lyric)
              }
            }

            // get mv
            if(type == 'mv'){
              // this.music.myVideo = true;
              // console.log(res)
              // console.log(res['data']['brs']['720'])
              // this.music.mvUrl = res['data']['brs']['720'];
              // let $videoPanel = document.getElementById('videoPanel');
              // let $video = document.createElement('video');
              // $video.setAttribute('src',res['data']['brs']['720']);
              // $video.setAttribute('controls','');
              // $video.setAttribute('autoplay','');
              // $videoPanel.appendChild($video);
            }
          }
        })
  }

  /*****
  *  格式化歌词
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  forMartLyric(lyric){
    let arrObj = [];
    // 判断当前歌词格式是否能匹配, 能再进行匹配，否则不操作
    if(lyric.match(/(\[[^\]]*\][\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FA5\uac00-\ud7ff(：|:)\w,\s]+)|(\[[^\]]*\][\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FA5\uac00-\ud7ff(：|:)\w,]+\s+[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FA5\uac00-\ud7ff(：|:)\w,]+)|(\[[^\]]*\][A-z]{n})/g)){
      // 用正则格式化歌词
      let arr = lyric.match(/(\[[^\]]*\][\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FA5\uac00-\ud7ff(：|:)\w,\s]+)|(\[[^\]]*\][\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FA5\uac00-\ud7ff(：|:)\w,]+\s+[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FA5\uac00-\ud7ff(：|:)\w,]+)|(\[[^\]]*\][A-z]{n})/g);
      // console.log('格式化出来的数组:',arr)
      arr.forEach((item) => {
        arrObj.push({
          date : item.match(/\[[^\]]*\]/g)[0],     // 截取时间
          lyric: item.substr(item.indexOf(']')+1)  // 截取歌词       
        });
      });
    }
    return arrObj;
  }

  /*****
  *  音乐控制 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  musicPlay() {
    let ytAud = document.getElementById('ytAudio');
    if(this.music.play){
      this.pause(ytAud);
    }else{
      this.play(ytAud);
    }
    this.music.play = !this.music.play;
  }

  /*****
  *  播放 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  play(dom){
    dom.play();
    // 开启定时器
    this.sumTimerFun();
  }

  /*****
  *  暂停 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  pause(dom){
    dom.pause();
    // 暂停定时器
    clearInterval(this.progressBar.timer);
  }

  /*****
  *  歌曲列表 点击 切换歌曲 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  changeThisMusic(e,music) {
    e.stopPropagation();
    console.log(music)
    // 切换歌曲信息
    this.music.item = music;
    // 暂停原歌曲 -- 清除定时器
    this.pause(document.getElementById('ytAudio'));
    // 根据坐标搜索发送请求去寻找下一首
    this.setBody(this.music.item);
    // 下一首后自动开启播放按钮
    this.music.play = true;
    // 获取歌曲
    this.getMusic(music);
    // 获取歌词
    this.getLyric(music);
  }

  /*****
  *  关闭歌曲列表 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  musicListClose(e){
    e.stopPropagation();
    this.progressBar.showList = true;
  }


}
