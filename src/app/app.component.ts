import { Component } from '@angular/core';
import { App,Platform,AlertController,NavController ,MenuController , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, alertCtrl: AlertController, app: App
  ,menu :MenuController, public htp: Http,public events: Events) {


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
    
    });

    events.subscribe('menu:opened', () => {
      this.setMenu();
    });

  }

  

  setMenu(){

    this.fFoto = "assets/imgs/blank-profile-default.png";
    
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

            this.navCtrl.insert(0,LoginPage);
            this.navCtrl.popToRoot();

          }
        }
      ]
    });
    confirm.present();
  }
  

  abrirPerfil(){

    var i = this.id;
    this.menu.close();
    this.navCtrl.push(PerfilPage);
  }

  abrirTurmas(){
    this.menu.close();
    this.navCtrl.push(TurmasPage);
  }

  irHome(){
    this.menu.close();
    this.navCtrl.push(HomeProfessorPage);
  }

  


}
