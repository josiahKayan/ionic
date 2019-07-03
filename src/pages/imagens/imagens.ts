import { Component } from '@angular/core';
import { IonicPage, Platform,NavController, NavParams,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Storage } from "@ionic/storage" ;
import { Events } from 'ionic-angular';


/**
 * 
 * Generated class for the ImagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagens',
  templateUrl: 'imagens.html',
})
export class ImagensPage {

  viewCtl : ViewController;
  camera : Camera;
  image:string;
  isImage:boolean;
  storage:Storage;
  platform:Platform;

  options: CameraOptions = {
      quality: 100,
      destinationType: 1,
      // destinationType: Camera.DestinationType.FILE_URI,
      sourceType: 1,
      // sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: 0,
      // encodingType: Camera.EncodingType.JPEG,
      targetWidth: 1200,
      targetHeight: 1200,
      saveToPhotoAlbum: true,
      correctOrientation:true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, viewCtl : ViewController,
    camera : Camera, stg:Storage, ptform: Platform,public events: Events) {
    
    this.camera = camera;
 
    this.viewCtl = viewCtl;

    if( this.image == null || this.image == undefined  ){
      this.isImage = false;
    }else
    {
      this.isImage = true;
    }

    this.storage = stg;

    this.platform = ptform;
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagensPage');

    this.platform.ready().then(()=>{
      
      //Salvar o valor
      this.storage.set('nome','Josias Kayan Lima de Carvalho').then(() =>{
        console.log('Adicionou');  
      });

      //Pegar a chave
      // this.storage.get('nome').then( nome=>{
      //   console.log('Storage ',nome);
      // });

      // //Pegar a chave
      // this.storage.remove('nome').then(()=>{
      //   console.log('Storage');
      // });

      // //Limpando o DB
      // this.storage.clear().then(()=>{
      //   console.log('Storage');
      // });

    });

  }

  tirarFoto(){
    

    //Tirar foto
   
    this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.image =  imageData;
        // this.image = 'data:image/jpeg;base64,' + imageData;

        

        console.log(this.image);
       }, (err) => {
        // Handle error
       });

  }

  salvarFoto(){
    
    this.storage.remove('nomefoto').then(()=>{
        console.log('Storage');
    });
    
    this.storage.set('nomefoto',this.image).then(() =>{
      console.log('Adicionou a foto');  
    });

    this.events.publish('imagem:set',this.image);



  }

  selecionarFoto(){
    

    //Selecionar Câmera
    this.options.sourceType = 0;
    this.camera.getPicture(this.options).then( foto =>{
      // this.image = `data/png;base64,${foto}`;
      this.image = foto;


      console.log(this.image);
      

    }).catch(err => console.log(err));
  }

  getImgContent(){
    return this.image;
  }


  sair = () =>{
    this.viewCtl.dismiss();
  }
}


