import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  character: any = {};

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.character = {
      item: {},
    }
  }

  ionViewDidLoad() {

    // 接收传递数据
    console.log(this.navParams['data'])
    this.character.item = this.navParams['data'];
   
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
