import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddClassPage } from './add-class';

@NgModule({
  declarations: [
    AddClassPage,
  ],
  imports: [
    IonicPageModule.forChild(AddClassPage),
  ],
})
export class AddClassPageModule {}
