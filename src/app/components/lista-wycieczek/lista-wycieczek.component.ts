import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { Wycieczka } from '../../models/wycieczka.model';
import { DataService } from '../../services/data.service';
import { CurrencyService } from '../../services/currency.service';
import { KoszykService } from '../../services/koszyk.service';
import { RecenzjaService } from '../../services/recenzja.service';
import { Recenzja } from '../../models/recenzja.model';

@Component({
  selector: 'app-lista-wycieczek',
  templateUrl: './lista-wycieczek.component.html',
  styleUrl: './lista-wycieczek.component.css'
})
export class ListaWycieczekComponent implements OnInit {
  wycieczki: Wycieczka[] = [];
  najnizszaCena: number = 0;
  najwyzszaCena: number = 0;
  paginowaneWycieczki: Wycieczka[] = [];
  aktualnaStrona: number = 1;
  iloscNaStronie: number = 6;
  public Math = Math;
  totalItems: number = 0;
  pages: number[] = [];
  private recenzje: { [wycieczkaId: string]: Recenzja[] } = {};

  constructor(
    private dataService: DataService,
    private router: Router, 
    public currencyService: CurrencyService,
    private koszykService: KoszykService,
    private recenzjaService: RecenzjaService
    ) {}

  ngOnInit(): void {
    this.dataService.pobierzWycieczki().subscribe(data => {
      this.wycieczki = data;
      this.totalItems = this.wycieczki.length;
      this.aktualizujCeny();
      this.aktualizujPaginacje();
      this.getDostepneMiejsca(this.wycieczki[0]);
    });
  }

  przejdzDoSzczegolow(wycieczka: Wycieczka): void {
    const nazwaUrl = this.formatujNazweDoUrl(wycieczka.nazwa);
    this.router.navigate(['/wycieczki', nazwaUrl]);
  }

  private formatujNazweDoUrl(nazwa: string): string {
    return encodeURIComponent(nazwa.replace(/\s+/g, '-'));
  }

  private aktualizujCeny(): void {
    this.najnizszaCena = this.wycieczki.reduce(
      (min, w) => (w.cena < min ? w.cena : min),
      this.wycieczki[0].cena
    );
    this.najwyzszaCena = this.wycieczki.reduce(
      (max, w) => (w.cena > max ? w.cena : max),
      this.wycieczki[0].cena
    );
  }

  private aktualizujPaginacje(): void {
    this.paginowaneWycieczki = this.wycieczki.slice(
      (this.aktualnaStrona - 1) * this.iloscNaStronie,
      this.aktualnaStrona * this.iloscNaStronie
    );

    this.pages = Array(Math.ceil(this.totalItems / this.iloscNaStronie)).fill(0).map((x, i) => i);
  }

  zmienStrone(aktualnaStrona: number): void {
    this.aktualnaStrona = aktualnaStrona +1;
    this.aktualizujPaginacje();
  }

  usunWycieczke(wycieczkaId: string): void {
    const wycieczkaIdStr = wycieczkaId.toString();
    this.dataService.usunWycieczke(wycieczkaIdStr)
      .then(() => {
        // Odświeżanie listy wycieczek...
        this.dataService.pobierzWycieczki().subscribe(data => {
          this.wycieczki = data;
          this.totalItems = this.wycieczki.length;
          this.aktualizujCeny();
          this.aktualizujPaginacje();
        });
      })
      .catch(error => {
        console.error("Wystąpił błąd przy usuwaniu wycieczki:", error);
      });
  }

  dodajDoKoszyka(wycieczka: Wycieczka): void {
    if (this.getDostepneMiejsca(wycieczka) > 0) {
      this.koszykService.dodajDoKoszyka(wycieczka);
    }
  }
  
  usunZKoszyka(wycieczka: Wycieczka): void {
    this.koszykService.usunZKoszyka(wycieczka.id);
  }
  

  getDostepneMiejsca(wycieczka: Wycieczka): number {
    const zarezerwowaneMiejsca = this.koszykService.getIloscZarezerwowanychMiejsc(wycieczka.id);
    return wycieczka.dostepneMiejsca - zarezerwowaneMiejsca;
  }

  sredniaOcena(wycieczkaId: string): number {
    const recenzje = this.recenzjaService.pobierzRecenzje(wycieczkaId);
    const suma = recenzje.reduce((acc, recenzja) => acc + recenzja.gwiazdki, 0);
    return recenzje.length > 0 ? suma / recenzje.length : 0;
  }

  iloscRecenzji(wycieczkaId: string): number {
      return this.recenzjaService.pobierzRecenzje(wycieczkaId).length;
  }

}
