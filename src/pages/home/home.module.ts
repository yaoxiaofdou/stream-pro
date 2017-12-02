import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AccountPageModule } from './account/account.module';
import { AddClassPageModule } from './add-class/add-class.module';
import { IconListPageModule } from './icon-list/icon-list.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    AccountPageModule,
    AddClassPageModule,
    IconListPageModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomeModule {}