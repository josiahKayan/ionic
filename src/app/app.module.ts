import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfessorPage } from '../pages/professor/professor';
import { AlunoPage } from '../pages/aluno/aluno';
import { HomePage } from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { WeatherProvider } from '../providers/weather/weather';
import { Http ,HttpModule} from '@angular/http' ;
// import { RedditServiceProvider } from '../providers/reddit-service/reddit-service';
import {CursoPage} from '../pages/curso/curso';
import { CadastrarAlunoPage } from '../pages/cadastrar-aluno/cadastrar-aluno';


@NgModule({
  declarations: [
    MyApp,
    AlunoPage,
    ProfessorPage,
    HomePage,
    CursoPage,
    TabsPage,
    CadastrarAlunoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlunoPage,
    ProfessorPage,
    HomePage,
    CursoPage,
    TabsPage,
    CadastrarAlunoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // RedditServiceProvider,

    // WeatherProvider
  ]
})
export class AppModule {}
