import { NgModule } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { LoginRegisterPage } from './login-register';

@IonicPage()
@NgModule({
  declarations: [
    LoginRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginRegisterPage),
  ],
})
export class LoginRegisterPageModule {}
