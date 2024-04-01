import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaWycieczekComponent } from './components/lista-wycieczek/lista-wycieczek.component';
import { SzczegolyWycieczkiComponent } from './components/szczegoly-wycieczki/szczegoly-wycieczki.component';
import { StronaGlownaComponent } from './components/strona-glowna/strona-glowna.component';
import { KoszykComponent } from './components/koszyk/koszyk.component';
import { HistoriaZamowienComponent } from './components/historia-zamowien/historia-zamowien.component';
import { DodanieWycieczkiComponent } from './components/dodanie-wycieczki/dodanie-wycieczki.component';

const routes: Routes = [
  { path: 'strona-glowna', component: StronaGlownaComponent },
  { path: 'koszyk', component: KoszykComponent },
  { path: 'historia-zamowien', component: HistoriaZamowienComponent },
  { path: 'wycieczki', component: ListaWycieczekComponent },
  { path: 'wycieczki/:nazwa', component: SzczegolyWycieczkiComponent },
  { path: 'dodaj-wycieczke', component: DodanieWycieczkiComponent },
  { path: '', redirectTo: '/wycieczki', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
