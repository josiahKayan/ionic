import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import {AlunoPage} from '../aluno/aluno';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-cadastrar-aluno',
  templateUrl: 'cadastrar-aluno.html',
})
export class CadastrarAlunoPage {
  basepath = "/addaluno";

  public alunoId: string;
  public nome: string;
  public nomeCompleto: string;
  public imagem: string;
  public email: string;
  public senha: string;
  public tagCode: string;
  public tags : Array<any> ;
  public confirmarsenha :  string  ;
  public mostrar : boolean = false;

  public dataNascimento : string ;
  public idade : number;
  public id : string ;
  public save:boolean;
  public edit:boolean;
  public aluno: Aluno;
  public usuario: Usuario;
  public tagId : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
      this.basepath = "http://localhost:8090/aluno/addaluno";
      this.save = false;
      this.edit = true;
      this.id = navParams.get('id');
      this.carrega();
      this.carregaTagsDisponiveis();
      
  }

  salvarCurso() {
    this.aluno = new Aluno();
    this.aluno.nome = this.nome ;
    this.aluno.nomeCompleto = this.nomeCompleto;
    this.aluno.imagem = this.imagem;
    this.aluno.dataNascimento = this.dataNascimento;
    this.aluno.idade = this.idade;

    this.aluno.usuario = new Usuario();
    this.aluno.usuario.email = this.email;
    this.aluno.usuario.senha = this.senha;
    
    this.aluno.tag = new Tag();

    this.aluno.tag.code = this.tagCode;
    this.aluno.tag.status = 1;

    

    alert(JSON.stringify(this.aluno));

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath, JSON.stringify(this.aluno), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            loading.dismiss();
            this.navCtrl.push(AlunoPage);
          }
        }
      );
      // location.reload();
      this.navCtrl.push(AlunoPage);
      
  }

  carrega() {



    if(!(this.id == "" || this.id == undefined)){
      this.mostrar = true;

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

    this.aluno = new Aluno();
    this.aluno.nome = this.nome ;
    this.aluno.nomeCompleto = this.nomeCompleto;
    this.aluno.imagem = this.imagem;
    this.aluno.dataNascimento = this.dataNascimento;
    this.aluno.idade = this.idade;

    this.aluno.usuario = new Usuario();
    this.aluno.usuario.email = this.email;
    this.aluno.usuario.senha = this.senha;
      
    this.aluno.tag = new Tag();
    this.aluno.tag.code = this.tagCode;
    this.aluno.tag.tagId = ""+ this.tagId ;

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://localhost:8090/aluno/";
      
      this.http.get(this.basepath+'/'+this.id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            var objAluno = {"AlunoId":"","Nome":"","NomeCompleto":"","Imagem":"","Tag":{"TagId":0,"Code":"","Status":0},"DataNascimento":"","Idade":0,"TagId":0,"Usuario":{"UsuarioId":0,"Email":"","Senha":""}};
            objAluno = result;
            
    this.aluno = new Aluno();
    this.nome = objAluno.Nome ;
    this.nomeCompleto = objAluno.NomeCompleto;
    this.imagem = objAluno.Imagem;
    this.dataNascimento = objAluno.DataNascimento;
    this.idade = objAluno.Idade;

    this.email = objAluno.Usuario.Email;
    this.senha = objAluno.Usuario.Senha;
    
    this.tagCode = objAluno.Tag.Code;
    this.alunoId = objAluno.AlunoId;


            this.save = true;
            this.edit = false;
            loading.dismiss();
          
        }
      );

    }
    
  }

  editarCurso( id: string){
    

    this.aluno = new Aluno();
    this.aluno.nome = this.nome ;
    this.aluno.nomeCompleto = this.nomeCompleto;
    this.aluno.imagem = this.imagem;
    this.aluno.dataNascimento = this.dataNascimento;
    this.aluno.idade = this.idade;
    this.aluno.usuario = this.usuario;
  
    this.aluno.usuario = new Usuario();
    this.aluno.usuario.email = this.email;
    this.aluno.usuario.senha = this.senha;
    this.alunoId = this.alunoId;

    this.aluno.tag = new Tag();
    this.aluno.tag.code = this.tagCode;
    this.aluno.tag.status = 0;

    this.basepath = "http://localhost:8090/aluno/update/";
    this.save = false;
    this.edit = true;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath+id, JSON.stringify(this.aluno), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          this.navCtrl.push(AlunoPage);    
        }
      );
      // location.reload();
      this.navCtrl.push(AlunoPage);
  }

  mudaTag(t : Tag): void{
    alert(t.code);    
    this.tagCode = t.code;

  }
  
  onSelectChange(selectedValue: any) {
    alert(JSON.stringify(selectedValue));
    this.tagCode = selectedValue.Code;
     
  }

  carregaTagsDisponiveis():void {

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();
  
      try {
         this.http.get("http://localhost:8090/tag/tags-free").map(res => res.json()).subscribe(res => {
          this.tags = res;
          // alert(JSON.stringify(this.alunos));
          loading.dismiss();
          


        });
      }
      catch (err) {
        alert(err);
      }
  
    }

  

}

export class Aluno {
  alunoId: string;
  nome: string;
  nomeCompleto: string;
  imagem: string;
  dataNascimento : string ;
  idade : number;
  usuario: Usuario;
  tag: Tag ;
}

export class Usuario{
  email: string;
  senha: string;
}

export class Tag {
  tagId: string;
  code: string;
  status: number;
  
}

