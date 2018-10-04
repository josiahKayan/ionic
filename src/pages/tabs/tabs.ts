import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CursoPage } from '../curso/curso';
import { ProfessorPage } from '../professor/professor';
import {AlunoPage} from '../aluno/aluno';
import {TagPage} from '../tag/tag';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = HomePage; 
  tab2Root = CursoPage;
  tab3Root = ProfessorPage;
  tab5Root = AlunoPage;
  tab6Root = TagPage;
  public showNavbar: boolean = false;


  constructor() {

    console.log('Ta aqui');

    this.showNavbar = false;


  }



}
