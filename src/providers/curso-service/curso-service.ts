import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CursoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CursoServiceProvider {

  private baseApiPath = "http://192.168.0.12:8090/curso/";
  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getCursos(){
    return this.http.get(this.baseApiPath+"cursos");
  }

  getCursoById(id : number){
    return this.http.get(this.baseApiPath+"{id}");
  }

  


}
