import { Component } from '@angular/core';
import { IonicPage,LoadingController ,AlertController ,ViewController, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../../shared/service/login.service';


@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  // 注册页全局对象
  register: any;

  loginLoading: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public loginService: LoginService
  ) {
    this.register = {
      phone: '',
      password: '',
      name: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
    // console.log(this.navParams)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // 教研手机
  checkPhone(phone) {
    let bool = false;
    if (phone.match(/(^13[0-9])|(^15[0-9])|(^17[0-9])|(^18[0-9])[0-9]\d{8}$/) === null) {
      bool = true;
    }
    return bool
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
  *  注册方法
  *  @param  :  (参数)
  *  @return :  (返回值说明)
  *****/
  Register() {
    
    if (!this.register.phone || !this.register.password || !this.register.name) {
      this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: '账号密码名称不能为空!',
        buttons: ['确认']
      }).present();
      return false;
    }

    if (this.checkPhone(this.register.phone)) {
      this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: '手机号码格式错误!',
        buttons: ['确认']
      }).present();
      return false;
    }

    const param = {
      phone: this.register.phone,
      password: this.register.password,
      name: this.register.name,
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    };

    // loading 开启
    this.loading('注册中,请稍后...','true');

    this.loginService.register(param)
        .then((res) => {
          // 接收返回的状态码 400 200
          if (res['state'] === 200) {
            // alert error
            this.alertCtrl.create({
              title: 'ERROR!',
              subTitle: '注册成功',
              buttons: ['确认']
            }).present();
            this.register.user = res['data'];
            this.viewCtrl.dismiss();
          }
          if (res['state'] === 400) {
            this.alertCtrl.create({
              title: 'ERROR!',
              subTitle: res['error'],
              buttons: ['确认']
            }).present();
          }
        });
    // loading 开启
    this.loading('','false');
  }
    

}
