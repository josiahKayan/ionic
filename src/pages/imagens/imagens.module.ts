import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagensPage } from './imagens';

@NgModule({
  declarations: [
    ImagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagensPage),
  ],
})
export class ImagensPageModule {}
