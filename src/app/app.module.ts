import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './environments/environment';
import { ListaWycieczekComponent } from './components/lista-wycieczek/lista-wycieczek.component';
import { SzczegolyWycieczkiComponent } from './components/szczegoly-wycieczki/szczegoly-wycieczki.component';
import { StronaGlownaComponent } from './components/strona-glowna/strona-glowna.component';
import { KoszykComponent } from './components/koszyk/koszyk.component';
import { DodanieWycieczkiComponent } from './components/dodanie-wycieczki/dodanie-wycieczki.component';
import { HistoriaZamowienComponent } from './components/historia-zamowien/historia-zamowien.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaWycieczekComponent,
    SzczegolyWycieczkiComponent,
    StronaGlownaComponent,
    KoszykComponent,
    DodanieWycieczkiComponent,
    HistoriaZamowienComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
