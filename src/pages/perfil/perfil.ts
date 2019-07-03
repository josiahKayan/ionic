import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.''''''''''''''''''''''''''''''''''com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private urlPerfilBase: string = "http://192.168.0.12:8090/usuario/";
  id : string ;
  public save:boolean;
  public edit:boolean;
  perfil : Perfil;
  username : string;
  fullusername : string;
  myBirthday : string;
  Img : string;
  camera : Camera;
  image:string;
  popover : PopoverController;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,
  camera : Camera, pop: PopoverController,public events: Events) {

    let idd =localStorage.getItem('id');
    this.id = idd;
    this.carrega();
    this.save = false;
    this.edit = true;
    this.camera = camera;
    this.popover = pop;

    events.subscribe('imagem:set', ev => {
      this.Img = ev;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');

    

  }

  carrega() {

    

    if(!(this.id == "" || this.id == undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      this.perfil = new Perfil();
      this.perfil.nome = this.username;
      this.perfil.nomeCompleto = this.fullusername;
      this.perfil.dataNascimento = this.myBirthday;

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      
      this.http.get(this.urlPerfilBase+'/GetPerfil/'+this.id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            
            
            this.username = result.Nome;
            this.fullusername = result.NomeCompleto;
            this.myBirthday = result.DataNascimento;
            this.save = true;
            this.edit = false;

            if( result.Imagem == null){
              this.Img ="assets/imgs/blank-profile-default.png";
            }
            else{
              this.Img = result.Imagem;
            }


            loading.dismiss();
          
        }
      );

    }
    
  }

  editarFoto = ev =>{
    //Adicionar aqui um modal

    const popover = this.popover.create('ImagensPage');

    popover.present(ev);

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   allowEdit:true,
    //   cameraDirection:0,
    //   correctOrientation:false,
    //   saveToPhotoAlbum:true,
    //   sourceType:1,
    //   targetHeight:800,
    //   targetWidth:800
    // }

    // //Tirar foto
    // options.sourceType = 1;
    // this.camera.getPicture(options).then( foto =>{
    //   this.image = `data/png;base64,${foto}`;
    // }).catch(err => console.log(err));

    //Selecionar Câmera
    // options.sourceType = 0;
    // this.camera.getPicture(options).then( foto =>{
    //   this.image = `data/png;base64,${foto}`;
    // }).catch(err => console.log(err));


  }

  salvarPerfil(){
    let perfil = new Perfil();

    perfil.nome = this.username;
    perfil.nomeCompleto = this.fullusername;
    perfil.dataNascimento = this.myBirthday;
    perfil.Imgem = this.Img;
    
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.urlPerfilBase+"UpdatePerfil/"+this.id, JSON.stringify(perfil), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          alert("Perfil Editado com sucesso!!");
        });
  }


  

}


export class Perfil {
  nome: string;
  nomeCompleto : string;
  dataNascimento: string;
  userId : number ;
  Imgem : string;

}