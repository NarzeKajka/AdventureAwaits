import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Wycieczka } from '../../models/wycieczka.model';
import { CurrencyService } from '../../services/currency.service';
import { KoszykService } from '../../services/koszyk.service';
import { RecenzjaService } from '../../services/recenzja.service';
import { Recenzja } from '../../models/recenzja.model';

@Component({
  selector: 'app-szczegoly-wycieczki',
  templateUrl: './szczegoly-wycieczki.component.html',
  styleUrls: ['./szczegoly-wycieczki.component.css']
})
export class SzczegolyWycieczkiComponent implements OnInit {
  wycieczka: Wycieczka | undefined;
  aktualneZdjecieIndex: number = 0;
  dostepne: number = 0;
  recenzje: Recenzja[] = [];
  nowaRecenzja: Recenzja = {
    nick: '',
    gwiazdki: 0,
    tekst: '',
    dataZakupu: new Date() || null,
    nazwa: ''
  };
  bledy: string[] = [];
  rating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public currencyService: CurrencyService,
    private koszykService: KoszykService,
    private recenzjaService: RecenzjaService
  ) {}

  ngOnInit(): void {
    const nazwa = this.route.snapshot.paramMap.get('nazwa');
    if (nazwa) {
      const nazwaDecoded = decodeURIComponent(nazwa.replace(/-/g, ' '));
      this.dataService.pobierzWycieczkePoNazwie(nazwaDecoded).subscribe(wycieczka => {
        this.wycieczka = wycieczka;
        if (wycieczka) {
          this.koszykService.dostepneMiejsca$.subscribe(dostepneMiejsca => {
            this.dostepne = dostepneMiejsca.get(wycieczka.id) || 0;
          });
          this.recenzje = this.recenzjaService.pobierzRecenzje(wycieczka.id);
        }
      });
    }
  }

  powrotDoListy(): void {
    this.router.navigate(['/wycieczki']);
  }

  poprzednieZdjecie(): void {
    if (this.aktualneZdjecieIndex > 0) {
      this.aktualneZdjecieIndex--;
    }
  }

  nastepneZdjecie(): void {
    if (this.wycieczka && this.aktualneZdjecieIndex < this.wycieczka.zdjecie.length - 1) {
      this.aktualneZdjecieIndex++;
    }
  }

  dodajDoKoszyka(wycieczka: Wycieczka): void {
    this.koszykService.dodajDoKoszyka(wycieczka);
  }

  usunZKoszyka(wycieczka: Wycieczka): void {
    this.koszykService.usunZKoszyka(wycieczka.id);
  }

  getDostepneMiejsca(wycieczka: Wycieczka): number {
    const zarezerwowaneMiejsca = this.koszykService.getIloscZarezerwowanychMiejsc(wycieczka.id);
    return wycieczka.dostepneMiejsca - zarezerwowaneMiejsca;
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.nowaRecenzja.gwiazdki = rating;
  }

  dodajRecenzje(): void {
    // Walidacja i obsługa błędów
    this.bledy = [];
    if (!this.nowaRecenzja.gwiazdki) {
      this.bledy.push('Ocena jest wymagana.');
    }
    if (this.nowaRecenzja.tekst.length < 50 || this.nowaRecenzja.tekst.length > 500) {
      this.bledy.push('Recenzja powinna zawierać od 50 do 500 znaków.');
    }
    if (!this.nowaRecenzja.nick) {
      this.bledy.push('Nick jest wymagany.');
    }
    if (this.nowaRecenzja.dataZakupu && new Date(this.nowaRecenzja.dataZakupu) > new Date()) {
      this.bledy.push('Data zakupu nie może być w przyszłości.');
    }

    if (this.bledy.length === 0 && this.wycieczka) {
      // Ustawienie nazwy wycieczki w recenzji
      this.nowaRecenzja.nazwa = this.wycieczka.id;
  
      // Dodanie recenzji za pomocą serwisu
      this.recenzjaService.dodajRecenzje(this.wycieczka.id, this.nowaRecenzja);
  
      // Pobranie aktualnej listy recenzji dla tej wycieczki
      this.recenzje = this.recenzjaService.pobierzRecenzje(this.wycieczka.id);
  
      // Wyczyszczenie formularza
      this.nowaRecenzja = {
        nick: '',
        gwiazdki: 0,
        tekst: '',
        dataZakupu: null,
        nazwa: this.wycieczka.id
      };
      this.rating = 0; // Resetowanie wybranej liczby gwiazdek
    }
  }

  obliczSredniaOcene(): number {
    if (!this.recenzje.length) return 0;
    const suma = this.recenzje.reduce((acc, recenzja) => acc + recenzja.gwiazdki, 0);
    return suma / this.recenzje.length;
  }

}