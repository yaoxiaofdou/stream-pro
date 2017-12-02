import { Component } from '@angular/core';
import { AlertController, 
         IonicPage, NavController, 
         NavParams,
         ModalController,
         LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginService } from '../../shared/service/login.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phone: any;
  password: any;
  savePsd: boolean;

  error: String = '';

  loginLoading: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public loginService: LoginService
  ) {
    
    this.phone = '';
    this.password = '';

  }

  ionViewDidLoad() {
    // 默认登陆
    this.defaultSign();
  }

  ionViewDidEnter() {
    console.log(this.navParams)
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
  *  默认登陆
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  defaultSign() {
    const param = JSON.parse(localStorage.getItem('KA-U'));
    if (param) {
      this.navCtrl.push(TabsPage);
      // loading 开启
      // this.loading('自动登录中,请稍后...','true');
      // login
      // this.linkService(param);
    }
  }

  /*****
  *  登陆验证
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  logIn() {
    // loading 开启
    this.loading('登录中,请稍后...','true');
    // param
    const param = {
      phone: this.phone,
      password: this.password
    };
    this.linkService(param);
  }

  /*****
  *  LINK SERVICE
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  linkService(param) {
    this.loginService.login(param)
      .then((res) => {
        switch (res['state']) {
          case 200:
            // 判断是否选择保存密码
            if (this.savePsd) {
              // 登陆信息处理过后 写入 本地存储
              localStorage.setItem('KA-U', JSON.stringify(res['data']));
            }
            // 服务里设置用户信息
            this.loginService.serviceSetUserData(res['data']);
            // 路由跳转到主界面
            this.navCtrl.push(TabsPage);
            break;
          case 400:
            // alert error
            this.alertCtrl.create({
              title: 'ERROR!',
              subTitle: res['error'],
              buttons: ['确认']
            }).present();
            // clear password
            this.password = '';
            break;
          case 404:
            // alert error
            this.alertCtrl.create({
              title: 'ERROR!',
              subTitle: res['error'],
              buttons: ['确认']
            }).present();
            // clear password and phone
            this.password = '';
            this.phone = '';
            break;
        }

        // close loading
        this.loading(' ','false');

      });
  }

  /*****
  *  register 
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  showRegister() {
    let modal = this.modalCtrl.create('LoginRegisterPage');
    // modal.onDidDismiss(data => {
    //   console.log(data);
    // });
    modal.present();
  }

}
