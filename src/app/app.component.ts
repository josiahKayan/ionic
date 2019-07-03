import { Component } from '@angular/core';
import { App,Platform,AlertController,NavController ,MenuController , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage" ;

import { Http, HttpModule, Headers } from '@angular/http';
import { LoginPage} from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { TurmasPage } from '../pages/turmas/turmas';
import { HomeProfessorPage } from '../pages/home-professor/home-professor';
import { Events } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  alertCtrl: AlertController;
  navCtrl: NavController;
  menu:MenuController;
  id:string;
  http:Http;
  fFoto:string;
  fName:string;
  storage : Storage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, alertCtrl: AlertController, app: App
  ,menu :MenuController, public htp: Http,public events: Events, str : Storage) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.alertCtrl = alertCtrl;
      // this.navCtrl = navCtrl;
      this.navCtrl = app.getRootNav();
      this.menu = menu;
      this.http = htp;
      splashScreen.hide();

    
    }).catch(err=>{
      console.log(err);
    });

    events.subscribe('menu:opened', () => {
      this.setMenu();
    });

    this.storage = str;

    // this.storage.get('nomefoto').then( nome=>{
      
    //   this.fFoto =nome;  

    // });

    this.setMenu();


  }

  

  setMenu(){

    // this.storage.get('nomefoto').then( nome=>{
      
    //   this.fFoto =nome;  

    // });

    if( this.fFoto == undefined || this.fFoto ==null  ){
      this.fFoto = "assets/imgs/blank-profile-default.png";

    }
    

    
    this.fName = localStorage.getItem('NomeCompleto');

    let hasPhoto =   localStorage.getItem('photo') ;

    if(  hasPhoto !=null ){
      this.fFoto = hasPhoto;
    }
    
    // if( result.NomeCompleto != null ){
    //   this.fName = result.NomeCompleto;
    // }


  }
  

  menuOpened() {

    this.events.publish('menu:opened', '');

    //code to execute when menu ha opened
    this.fFoto = "assets/imgs/blank-profile-default.png";
    
    this.fName = localStorage.getItem('NomeCompleto');

    let hasPhoto =   localStorage.getItem('photo') ;

    if(  hasPhoto !=null ){
      this.fFoto = hasPhoto;
    }
}




menuClosed() {

  //code to execute when menu ha opened
  this.fFoto = "assets/imgs/blank-profile-default.png";
    
  this.fName = localStorage.getItem('NomeCompleto');

  let hasPhoto =   localStorage.getItem('photo') ;

  if(  hasPhoto !=null ){
    this.fFoto = hasPhoto;
  }

}


  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Sair',
      message: 'Você deseja realmente SAIR?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            console.log('Agree clicked');
      
            // this.app.getRootNav().setRoot( LoginPage );

            // let rootNav = getRootNav(this.navCtrl);
            // rootNav.setRoot(LoginPage);
            this.menu.close();
            localStorage.clear();
            // this.navCtrl.setRoot(LoginPage);

            this.navCtrl.insert(0,LoginPage).then( ()=>{
              
              setTimeout(() => {
                this.navCtrl.popToRoot().then( ()=>{

                });
              }, 1000);
              
            });
            

          }
        }
      ]
    });
    confirm.present();
  }
  

  abrirPerfil(){

    var i = this.id;
    this.menu.close().then( ()=>{
      this.navCtrl.push(PerfilPage).then( ()=>{

      });
    });
    
  }

  abrirTurmas(){
    this.menu.close().then( ()=>{
      this.navCtrl.push(TurmasPage).then( ()=>{

      });
    });
    
  }

  irHome(){
    this.menu.close().then( ()=>{
      this.navCtrl.push(HomeProfessorPage).then( ()=>{

      });
    });
    
  }

  


}
