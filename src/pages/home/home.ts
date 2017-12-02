import { Component } from '@angular/core';
import { ModalController,AlertController,NavController } from 'ionic-angular';
import { AccountPage } from './account/account';
import { AddClassPage } from './add-class/add-class';

import { UserService } from '../../shared/service/user.service';
import { FunctionService } from '../../shared/service/function.service';
import { WarpperService } from '../../shared/service/warpper.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  kaClass: object[];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public userService: UserService,
    public warpperService: WarpperService,
    public functionService: FunctionService
  ) {

    // default class data
    this.defaultClassData();

  }

  /*****
  *  获取首页列表数据 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  getListData(){
    
  }

  /*****
  *  打开分类详情 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  openModal(characterNum) {
    let modal = this.modalCtrl.create(AccountPage, characterNum);
    // 这边可以执行请求数据
    modal.present();
  }

  /*****
  *  默认请求分类数据 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  defaultClassData() {
    this.userService.getClassAll()
        .then((data) => {
          // console.log(data)
          this.kaClass = this.functionService.clearObjToArray(data)
        })
  }

  show() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  /*****
  *  新增分类 弹出界面 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  addClass() {
    let addClassModal = this.modalCtrl.create(AddClassPage);
    addClassModal.onDidDismiss((data)=>{
      // default class data
      this.defaultClassData();
    })
    addClassModal.present();
  }

}
