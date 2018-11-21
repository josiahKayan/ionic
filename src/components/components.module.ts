import { NgModule } from '@angular/core';
import { CadastrarProfessorComponent } from './cadastrar-professor/cadastrar-professor';
import { CadastrarCursoComponent } from './cadastrar-curso/cadastrar-curso';
import { PerfilComponent } from './perfil/perfil';
import { TurmasComponent } from './turmas/turmas';
import { PostComponent } from './post/post';
import { ListaChamadaComponent } from './lista-chamada/lista-chamada';
import { ResumoChamadaComponent } from './resumo-chamada/resumo-chamada';
@NgModule({
	declarations: [CadastrarProfessorComponent,
    CadastrarCursoComponent,
    PerfilComponent,
    TurmasComponent,
    PostComponent,
    ListaChamadaComponent,
    ResumoChamadaComponent],
	imports: [],
	exports: [CadastrarProfessorComponent,
    CadastrarCursoComponent,
    PerfilComponent,
    TurmasComponent,
    PostComponent,
    ListaChamadaComponent,
    ResumoChamadaComponent]
})
export class ComponentsModule {}
