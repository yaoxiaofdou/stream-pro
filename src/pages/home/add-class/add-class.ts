import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { HomeProvider } from '../../../providers/home/home';
import { UserService } from '../../../shared/service/user.service';

import { IconListPage } from '../icon-list/icon-list';

@IonicPage()
@Component({
  selector: 'page-add-class',
  templateUrl: 'add-class.html',
})
export class AddClassPage {

  addclass: any;

  loginLoading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public homeProvider: HomeProvider,
    public userService: UserService
  ) {
    this.addclass = {
      colorlist: this.homeProvider.appColorList,
      icon: '',
      label: '',
      color: '',
      title: '',
      date: '',
      why: '',
      price: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClassPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  /*****
  *  loading component
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  loading(val,bool) {
    // "自动登录中,请稍后..."
    if(bool === 'true'){
      this.loginLoading = this.loadingCtrl.create({
        content: val,
      });
      this.loginLoading.present();
    }else{
      this.loginLoading.dismiss();
    }
  }

  /*****
  *  show IconModal
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  showIconModal() {
    let IconList = this.modalCtrl.create(IconListPage);
    IconList.onDidDismiss((data)=>{
      this.addclass.icon = data;
    })
    IconList.present();
  }
  
  /*****
  *  创建新分类 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  createClass() {
    
    if(!this.addclass.icon){
      let alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'ICON 不能为空！',
        buttons: ['确认']
      });
      alert.present();
      return false;
    }

    if(!this.addclass.classname){
      let alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'class Name 不能为空！',
        buttons: ['确认']
      });
      alert.present();
      return false;
    }

    // loading 开启
    this.loading('正在创建分类，请稍后...','true');

    const param = {
      color: this.addclass.color,
      icon: this.addclass.icon.icon,
      name: this.addclass.classname
    };

    this.userService.CreateClass(param)
        .then((res) => {
          console.log(res)
          // loading close
          this.loading('','false');
          if (res['state'] === 200) {
            this.alertCtrl.create({
              title: 'SUCCESS',
              subTitle: '分类创建成功！',
              buttons: ['确认']
            })
            setTimeout(()=>{
              this.viewCtrl.dismiss();
            },500)
          }else {
            this.alertCtrl.create({
              title: 'ERROR',
              subTitle: '分类创建失败~',
              buttons: ['确认']
            })
            this.addclass.classname = '';
          }
          
        })

  }

}
