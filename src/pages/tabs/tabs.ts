import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CursoPage } from '../curso/curso';
import { ProfessorPage } from '../professor/professor';
import {AlunoPage} from '../aluno/aluno';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CursoPage;
  tab3Root = ProfessorPage;
  tab5Root = AlunoPage;
  

  constructor() {

  }
}
