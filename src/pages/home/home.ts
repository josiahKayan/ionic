import { Component } from '@angular/core';
// import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public feeds: Array<string>;
  private url: string = "https://www.reddit.com/new.json";  

  constructor() {

    // this.fetchContent();

  }

  // fetchContent ():void {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Fetching content...'
  //   });

  //   loading.present();

  //   this.http.get(this.url).map(res => res.json())
  //     .subscribe(data => {
  //       // alert(JSON.stringify(data));
  //       loading.dismiss();
  //     });  
  // }

  // itemSelected (feed):void {
  //   alert(feed);
  // } 

}