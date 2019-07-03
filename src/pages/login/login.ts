import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams,ToastController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { HomeProfessorPage } from '../home-professor/home-professor';
import { HomeAlunoPage } from '../home-aluno/home-aluno';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Events, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username : string ;
  public password : string ;
  public basepath = "/usuario";
  public showNavbar : boolean ;
  public tabs : TabsPage;
  public push : Push;
  public idRegistration: string;
  alert:AlertController;
  network: Network;
  toast: ToastController;
  platform: Platform;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,
     ppush : Push, public alrt:AlertController,public events: Events,net: Network
     ,public t: ToastController, ptform: Platform ) {

    this.toast = t;

    this.network = net;

    this.platform = ptform;

    // this.basepath = "httpdd://192.168.0.13:8090/usuario/login";
    this.basepath = "http://192.168.0.12:8090/usuario/login";

    this.alert = alrt;

    this.showNavbar = navParams.get('login');

    if(  this.showNavbar == false ){
      this.showNavbar = false;
    }
    else{
      this.showNavbar = false;
    }

    this.push = ppush;

      let isApp = false ;

      isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));

      if(isApp){
        this.setupNotifications();
      }
    
  }

  ionViewDidLoad() {
    
    
    this.platform.ready().then(()=>{


      this.network.onConnect().subscribe(()=>{
        // alert('Conectado');
      });

      this.network.onDisconnect().subscribe(()=>{
        alert('Telefone sem conexão com a internet');
      });

    });
    
    console.log('ionViewDidLoad LoginPage');
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }


  
  }


  setupNotifications(){

    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');

          const options: PushOptions = {
              android: {},
              ios: {
                  alert: 'true',
                  badge: true,
                  sound: 'false'
              },
              windows: {},
              browser: {
                  pushServiceURL: 'http://push.api.phonegap.com/v1/push'
              }
          }

          const pushObject: PushObject = this.push.init(options);

          pushObject.on('notification').subscribe((notification: any) => 
          {
              console.log(notification.message);
          });

          pushObject.on('registration').subscribe((registration: any) =>{

           console.log('Device registered', registration);
           this.idRegistration = registration.registrationId ;
          
          });

          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

        } else {
          console.log('We do not have permission to send push notifications');
        }
    });

}

  
checkConnection() {
  
  alert('buc');

  // watch network for a disconnection
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  alert('network was disconnected :-(');
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  alert('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      alert('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();

}




  public login(){

    

    let usuario = new Usuario();

    usuario.email = this.username;
    usuario.senha = this.password;
    usuario.notificacaoId = this.idRegistration;
    
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath, JSON.stringify(usuario), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result!=null || result != undefined ){
            

            

            //Admin
            if(result.Perfil == 2){
              let alert = this.alert.create({
                title: '',
                subTitle: 'Bem-Vindo!!!',
                buttons: ['Ok']
              });
              alert.present();
              this.navCtrl.push(TabsPage);
            }
            //Professor
            else if(result.Perfil == 1){

              let alert = this.alert.create({
                title: '',
                subTitle: 'Bem-Vindo!!!',
                buttons: ['Ok']
              });
              alert.present();
              localStorage.setItem('id',result.UsuarioId);
              localStorage.setItem('aluno',"false");

              this.setDados(result.UsuarioId,false);


              this.navCtrl.push(HomeProfessorPage, { id : result.UsuarioId});
            }
            //Aluno
            else if(result.Perfil == 0){
              let alert = this.alert.create({
                title: '',
                subTitle: 'Bem-Vindo!!!',
                buttons: ['Ok']
              });
              alert.present();
              localStorage.setItem('id',result.UsuarioId);
              localStorage.setItem('aluno',"true");

              this.setDados(result.UsuarioId,true);


              this.navCtrl.push(HomeAlunoPage, { id : result.UsuarioId});
            }
            else{
              let alert = this.alert.create({
                title: 'Erro',
                subTitle: 'Houve algum erro no login',
                buttons: ['Ok']
              });
              alert.present();
            }
          }
          else{
            // alert(JSON.stringify(result));

            let alert = this.alert.create({
              title: 'Erro',
              subTitle: 'Houve algum erro',
              buttons: ['Ok']
            });
            alert.present();

          }
        }
      );
      
  }


    setDados( idGeneral : number , isAluno : boolean ){

        if(isAluno){

            let headers = new Headers();
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            headers.append('Accept','application/json');
            headers.append('content-type','application/json');

            let base = "http://192.168.0.12:8090/aluno/usuario/"+idGeneral;
            
            this.http.get(base  ,{ headers: headers })
            .map(
              res => res.json()
            )
            .subscribe(
              (result) => {

                if(result != null){
                  if(  result.Imagem !=null ){
                    localStorage.setItem('photo',result.Imagem);
                  }
                  if( result.NomeCompleto != null ){
                    localStorage.setItem('NomeCompleto',result.NomeCompleto);
                  }
                }
                

                this.events.publish('menu:opened','');
                
              }
            );
        }

        if(!isAluno){

          let headers = new Headers();
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            headers.append('Accept','application/json');
            headers.append('content-type','application/json');

            let base = "http://192.168.0.12:8090/professor/usuario/"+idGeneral;
            
            this.http.get(base  ,{ headers: headers })
            .map(
              res => res.json()
            )
            .subscribe(
              (result) => {

                if(  result.Imagem !=null ){
                  localStorage.setItem('photo',result.Imagem);
                }
                if( result.NomeCompleto != null ){
                  localStorage.setItem('NomeCompleto',result.NomeCompleto);
                }
                
                this.events.publish('menu:opened','');


              }
            );
        }

    }


    


  }




export class Usuario{
  usuarioId: string;
  email: string;
  senha: string;
  perfil: number;
  notificacaoId: string;
}
