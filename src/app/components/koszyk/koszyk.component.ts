import { Component, OnInit } from '@angular/core';

import { KoszykService } from '../../services/koszyk.service';
import { KoszykItem } from '../../models/koszyk-item.model';
import { HistoriaZamowienService } from '../../services/historia-zamowien.service';
import { Zamowienie } from '../../models/zamowienie.model';
import { CurrencyService } from '../../services/currency.service';


@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {
  koszykItems: KoszykItem[] = [];
  aktualnaWaluta: string = 'PLN';

  constructor(private koszykService: KoszykService, private historiaZamowienService: HistoriaZamowienService, public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.koszykService.items$.subscribe(items => {
      this.koszykItems = items;
      this.przeliczCeny();
    });

    this.currencyService.walutaObs$.subscribe(waluta => {
      this.aktualnaWaluta = waluta;
      this.przeliczCeny();
    });
  }

  dodajDoKoszyka(item: KoszykItem): void {
    this.koszykService.dodajDoKoszyka(item.wycieczka);
  }
  
  usunZKoszyka(item: KoszykItem): void {
    this.koszykService.usunZKoszyka(item.wycieczka.id);
  }
  
  mozeDodacMiejsce(item: KoszykItem): boolean {
    const dostepneMiejsca = this.koszykService.getDostepneMiejsca(item.wycieczka.id);
    return item.ilosc < dostepneMiejsca;
  }

  zakupWycieczki(): void {
    console.log("Wywołano metodę zakupWycieczki");

    let zaznaczoneWycieczki = this.koszykItems.filter(item => item.selected);
    console.log("Zaznaczone wycieczki:", zaznaczoneWycieczki);
    const numerZamowienia = new Date().getTime().toString(36).substr(2, 4) + Math.random().toString(36).substr(2, 4);

    this.koszykService.zakupWycieczki();
    zaznaczoneWycieczki.forEach(item => {
      const zamowienie: Zamowienie = {
        numerZamowienia,
        wycieczka: item.wycieczka,
        ilosc: item.ilosc,
        dataZakupu: new Date(),
        status: this.obliczStatus(item.wycieczka.dataRozpoczecia.toString(), item.wycieczka.dataZakonczenia.toString()),
      };
      this.historiaZamowienService.dodajDoHistorii(zamowienie);
    });
  }

  private obliczStatus(dataRozpoczeciaString: string, dataZakonczeniaString: string): 'przed' | 'w trakcie' | 'zakończona' {
    const teraz = new Date();
    const dataRozpoczecia = new Date(dataRozpoczeciaString);
    const dataZakonczenia = new Date(dataZakonczeniaString);
  
    console.log(teraz);
  
    if (teraz < dataRozpoczecia) return 'przed';
    if (teraz >= dataRozpoczecia && teraz <= dataZakonczenia) return 'w trakcie';
    return 'zakończona';
  }

  przeliczCeny(): void {
    this.koszykItems = this.koszykItems.map(item => {
      return {
        ...item,
        wycieczka: {
          ...item.wycieczka,
          cena: this.currencyService.przeliczCene(item.wycieczka.cena)
        }
      };
    });
  }

  obliczSumeDoZaplaty(): number {
    return this.koszykItems
      .filter(item => item.selected)
      .reduce((suma, item) => suma + this.currencyService.przeliczCene(item.wycieczka.cena * item.ilosc), 0);
  }

  zmienZaznaczenie(item: KoszykItem): void {
    this.koszykService.aktualizujZaznaczenie(item.wycieczka.id, item.selected || false);
  }  
  
}