import { Component } from '@angular/core';
import { IonicPage,ViewController ,NavController, NavParams } from 'ionic-angular';

import { HomeProvider } from '../../../providers/home/home';


@IonicPage()
@Component({
  selector: 'page-icon-list',
  templateUrl: 'icon-list.html',
})
export class IconListPage {

  iconlist: any;

  constructor(
    public navCtrl: NavController,
    public homeProvider: HomeProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.iconlist = this.homeProvider.appClassIcon;
  }

  /*****
  *  callback icon 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  callbackIcon(icon){
    this.viewCtrl.dismiss(icon);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad IconListPage');
  }

}
