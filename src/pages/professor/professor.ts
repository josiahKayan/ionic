import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-professor',
  templateUrl: 'professor.html',
})
export class ProfessorPage {

  basepath = "/professores";
  public professores: Array<any>;
  
  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.basepath = "http://localhost:8090/professor/professores";
    this.Content();
  }

  Content(): void {

    try {
      this.http.get(this.basepath).map(res => res.json()).subscribe(res => {
        this.professores = res;
        // alert(JSON.stringify(this.professores));
      });
    }
    catch (err) {
      alert(err);
    }

  }

}




