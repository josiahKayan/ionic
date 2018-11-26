import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.id = navParams.get('id');

    if(this.id != undefined){
      localStorage.setItem("id",this.id);
      localStorage.setItem("aluno",'true');

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAlunoPage');
  }

}
