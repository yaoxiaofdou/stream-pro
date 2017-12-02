import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MusicProvider {

  url: any;

  constructor(
    public http: HttpClient
  ) {
    this.url = 'https://api.imjad.cn/cloudmusic/'
    // console.log('Hello MusicProvider Provider');
  }

  /*****
  *  根据用户输入搜索对应歌曲id
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  searchID(param){
    let params: HttpParams = new HttpParams();
    params = params.set('type', param['type']);                 // search
    // params = params.set('search_type', param['search_type']);   // 1
    params = params.set('s', param['text']);                    // 彩虹
    params = params.set('limit', param['limit'] );              // 返回结果数量
    params = params.set('offset', param['offset'] );            // 偏移数量，用于分页
    
    return this.http.get(this.url,{params:params})
  }

  /*****
  *  根据音乐id获取对应的音乐 mp3
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getMusic(param){
    let params: HttpParams = new HttpParams();
    // https://api.imjad.cn/cloudmusic/?type=song&id=185809&br=128000
    params = params.set('type', param['type']);                 // search
    params = params.set('id', param['id']);                     // 彩虹
    params = params.set('br', param['br'] );                    // 128000 198000 320000
    
    return this.http.get(this.url,{params:params})
  }

  /*****
  *  获取榜单 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getRanking(pam){
    let params: HttpParams = new HttpParams();
    params = params.set('type', 'playlist');                 // search
    params = params.set('id', pam['id']);                 // id

    return this.http.get(this.url,{params:params})
  }

  /*****
  *  格式化歌词作者 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  formartAuthor(AuthorList){
    let str = '';
    if(AuthorList){
      AuthorList.forEach((author,index) => {
        if(index == (AuthorList.length-1)){
          str += author['name']
        }else {
          str += author['name'] + ' ,'
        }
      });
    }
    return str;
  }

}
