import { NgModule } from '@angular/core';
import { CadastrarProfessorComponent } from './cadastrar-professor/cadastrar-professor';
import { CadastrarCursoComponent } from './cadastrar-curso/cadastrar-curso';
import { PerfilComponent } from './perfil/perfil';
import { TurmasComponent } from './turmas/turmas';
import { PostComponent } from './post/post';
import { ListaChamadaComponent } from './lista-chamada/lista-chamada';
import { ResumoChamadaComponent } from './resumo-chamada/resumo-chamada';
import { GeraQrcodeComponent } from './gera-qrcode/gera-qrcode';
import { LeituraQrcodeComponent } from './leitura-qrcode/leitura-qrcode';
import { HomeAlunoComponent } from './home-aluno/home-aluno';
@NgModule({
	declarations: [CadastrarProfessorComponent,
    CadastrarCursoComponent,
    PerfilComponent,
    TurmasComponent,
    PostComponent,
    ListaChamadaComponent,
    ResumoChamadaComponent,
    GeraQrcodeComponent,
    LeituraQrcodeComponent,
    HomeAlunoComponent],
	imports: [],
	exports: [CadastrarProfessorComponent,
    CadastrarCursoComponent,
    PerfilComponent,
    TurmasComponent,
    PostComponent,
    ListaChamadaComponent,
    ResumoChamadaComponent,
    GeraQrcodeComponent,
    LeituraQrcodeComponent,
    HomeAlunoComponent]
})
export class ComponentsModule {}
