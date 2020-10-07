import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMataPage } from './list-mata';

@NgModule({
  declarations: [
    ListMataPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMataPage),
  ],
})
export class ListMataPageModule {}
