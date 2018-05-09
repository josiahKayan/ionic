import { NgModule } from '@angular/core';
import { CadastrarProfessorComponent } from './cadastrar-professor/cadastrar-professor';
import { CadastrarCursoComponent } from './cadastrar-curso/cadastrar-curso';
@NgModule({
	declarations: [CadastrarProfessorComponent,
    CadastrarCursoComponent],
	imports: [],
	exports: [CadastrarProfessorComponent,
    CadastrarCursoComponent]
})
export class ComponentsModule {}
