import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-home-professor',
  templateUrl: 'home-professor.html',
})
export class HomeProfessorPage {


  id : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.id = navParams.get('id');

    if(this.id != undefined){
      localStorage.setItem("id",this.id);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProfessorPage');
  }

}
