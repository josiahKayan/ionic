import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarCursoPage } from './cadastrar-curso';

@NgModule({
  declarations: [
    CadastrarCursoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarCursoPage),
  ],
})
export class CadastrarCursoPageModule {}
