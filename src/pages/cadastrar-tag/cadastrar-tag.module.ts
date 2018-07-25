import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarTagPage } from './cadastrar-tag';

@NgModule({
  declarations: [
    CadastrarTagPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarTagPage),
  ],
})
export class CadastrarTagPageModule {}
