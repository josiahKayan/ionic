import { Component } from '@angular/core';
import { App,Platform,AlertController,NavController ,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { TurmasPage } from '../pages/turmas/turmas';
import { HomeProfessorPage } from '../pages/home-professor/home-professor';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  alertCtrl: AlertController;
  navCtrl: NavController;
  menu:MenuController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, alertCtrl: AlertController, app: App
  ,menu :MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.alertCtrl = alertCtrl;
      // this.navCtrl = navCtrl;
      this.navCtrl = app.getRootNav();
      this.menu = menu;
      splashScreen.hide();
    });
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
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

  abrirPerfil(){
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
