import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IconListPage } from './icon-list';

@NgModule({
  declarations: [
    IconListPage,
  ],
  imports: [
    IonicPageModule.forChild(IconListPage),
  ],
})
export class IconListPageModule {}
