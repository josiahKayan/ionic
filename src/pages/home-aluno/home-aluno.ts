import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';

/**
 * Generated class for the HomeAlunoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-aluno',
  templateUrl: 'home-aluno.html',
})
export class HomeAlunoPage {

      id : string;
      titulo:string;
      publicacao:string;
      protected listaMensagem: any; 
      nav : NavController;
      alertCtrl: AlertController;
      loading: LoadingController;
      imgTitulo: string;
      page = 1;
      perPage = 10;
    
      constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController,alertCtrl: AlertController ) {
    
        this.id = navParams.get('id');
    
        this.loading = loadingCtrl;
        this.alertCtrl = alertCtrl;
    
        if(this.id != undefined){
          localStorage.setItem("id",this.id);
          localStorage.setItem("aluno",'true');
        }
    
        this.carregaMural();
    
    
      }
    
      ionViewDidLoad() {
        console.log('ionViewDidLoad HomeProfessorPage');
      }
    
      carregaMural(){
    
        
          let loading = this.loadingCtrl.create({
            content: 'Carregando...'
          });
      
          loading.present();
    
          let headers = new Headers();
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
    
          let pbpath = "http://192.168.0.12:8090/publicacao/publicacoes/aluno/";
          
          this.http.get(pbpath+localStorage.getItem("id")+"/"+this.perPage+"/"+this.page  ,{ headers: headers })
          .map(
            res => res.json()
          )
          .subscribe(
            (result) => {
    
                // this.imgTitulo = "assets/imgs/blank-profile-default.png";     
                this.listaMensagem = result;
    
                loading.dismiss();
              
            }
          );
    
          loading.dismiss();
    
    
      }
    
      isNulo( img : any ){

        if(img != null){
          return img;
        }
        else{
          return "assets/imgs/blank-profile-default.png";      
        }
    
      }
    
      SelecionaMes( mes:number ){
        let arrayMonth = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        var ttt =  arrayMonth[mes-1];
        return ttt ;
      }

      doInfinite(infiniteScroll) {
    
    
        setTimeout(() => {
          
          this.perPage = this.perPage + 10;
          
          this.carregaMural();
    
          infiniteScroll.complete();
        }, 2000);
    
      }

    }
    
    export class Mensagem{
      PublicacaoId: number;
      UsuarioId: number;
      HoraPublicacao: string;
      Mes: number;
      Ano: number;
      Dia: number;
      Mensagem: string;
      Titulo:string;
      UsuarioDestino:string;
      IdUnico:string;
      TurmasId:string;
    }
    