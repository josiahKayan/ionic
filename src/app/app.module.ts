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
import {CursoPage} from '../pages/curso/curso';
import { CadastrarAlunoPage } from '../pages/cadastrar-aluno/cadastrar-aluno';
import { CadastrarCursoPage } from '../pages/cadastrar-curso/cadastrar-curso';
import { CadastrarProfessorPage } from '../pages/cadastrar-professor/cadastrar-professor';
import { CadastrarTagPage } from '../pages/cadastrar-tag/cadastrar-tag';

import { TagPage } from '../pages/tag/tag';
import { CursoServiceProvider } from '../providers/curso-service/curso-service';
import { UsuarioPage } from '../pages/usuario/usuario';
import { LoginPage} from '../pages/login/login';
import { HomeProfessorPage } from '../pages/home-professor/home-professor';
import { TurmasPage } from '../pages/turmas/turmas';
import { PerfilPage } from '../pages/perfil/perfil';
import { TurmasComponent } from '../components/turmas/turmas';
import {ListaChamadaComponent} from '../components/lista-chamada/lista-chamada';
import {ResumoChamadaComponent} from '../components/resumo-chamada/resumo-chamada';

import {GeraQrcodeComponent} from '../components/gera-qrcode/gera-qrcode';
import { Geolocation } from '@ionic-native/geolocation';
import {HomeAlunoPage} from '../pages/home-aluno/home-aluno';
import {LerQrcodeComponent} from '../components/ler-qrcode/ler-qrcode';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeComponent  } from 'ngx-qrcode2';
import { GeralComponent } from '../components/geral/geral';

import {AboutPage} from '../pages/about/about';

import {ContactPage} from '../pages/contact/contact';


// import { Platform } from 'ionic-angular';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    AlunoPage,
    ProfessorPage,
    HomePage,
    CursoPage,
    TabsPage,
    TagPage,
    CadastrarAlunoPage,
    CadastrarCursoPage,
    CadastrarProfessorPage,
    CadastrarTagPage,
    UsuarioPage,
    LoginPage,
    HomeProfessorPage,
    TurmasPage,
    PerfilPage,
    TurmasComponent,
    ListaChamadaComponent,
    ResumoChamadaComponent,
    GeraQrcodeComponent,
    HomeAlunoPage,
    LerQrcodeComponent,
    NgxQRCodeComponent,
    GeralComponent,
    AboutPage,
    ContactPage

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
    TagPage,
    CadastrarAlunoPage,
    CadastrarCursoPage,
    CadastrarProfessorPage,
    CadastrarTagPage,
    UsuarioPage,
    LoginPage,
    HomeProfessorPage,
    TurmasPage,
    PerfilPage,
    TurmasComponent,
    ListaChamadaComponent,
    ResumoChamadaComponent,
    GeraQrcodeComponent,
    HomeAlunoPage,
    LerQrcodeComponent,
    NgxQRCodeComponent,
    GeralComponent,
    AboutPage,
    ContactPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CursoServiceProvider,
    Push,
    Geolocation,
    NgxQRCodeComponent,

    BarcodeScanner

    // RedditServiceProvider,

    // WeatherProvider
  ]
})
export class AppModule {}
