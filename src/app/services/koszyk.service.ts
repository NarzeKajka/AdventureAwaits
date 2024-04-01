import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DataService } from './data.service';
import { Wycieczka } from '../models/wycieczka.model';
import { KoszykItem } from '../models/koszyk-item.model';


@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  private itemsSubject = new BehaviorSubject<KoszykItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  private dostepneMiejsca = new BehaviorSubject<Map<string, number>>(new Map());
  dostepneMiejsca$ = this.dostepneMiejsca.asObservable();


  constructor(private dataService: DataService) { 
    this.aktualizujDostepneMiejsca();
  }
  

  dodajDoKoszyka(wycieczka: Wycieczka): void {
    const aktualneItems = this.itemsSubject.value;
    const znalezionyItem = aktualneItems.find(item => item.wycieczka.id === wycieczka.id);

    if (znalezionyItem) {
      znalezionyItem.ilosc++;
    } else {
      aktualneItems.push({ wycieczka, ilosc: 1, selected: false });
    }

    this.itemsSubject.next(aktualneItems);
    this.aktualizujDostepneMiejsca();
  }

  usunZKoszyka(wycieczkaId: string): void {
    let aktualneItems = this.itemsSubject.value;
    const znalezionyItem = aktualneItems.find(item => item.wycieczka.id === wycieczkaId);
  
    if (znalezionyItem && znalezionyItem.ilosc > 1) {
      znalezionyItem.ilosc--;
    } else {
      aktualneItems = aktualneItems.filter(item => item.wycieczka.id !== wycieczkaId);
    }
  
    this.itemsSubject.next(aktualneItems);
    this.aktualizujDostepneMiejsca();
  }  

  getIloscZarezerwowanychMiejsc(wycieczkaId: string): number {
    return this.itemsSubject.value
      .filter(item => item.wycieczka.id === wycieczkaId)
      .reduce((sum, current) => sum + current.ilosc, 0);
  }

  aktualizujDostepneMiejsca(): void {
    let noweDostepneMiejsca = new Map<string, number>();
    this.dataService.pobierzWycieczki().subscribe(wycieczki => {
      wycieczki.forEach(wycieczka => {
        let zarezerwowaneMiejsca = this.getIloscZarezerwowanychMiejsc(wycieczka.id);
        noweDostepneMiejsca.set(wycieczka.id, wycieczka.maxMiejsca - zarezerwowaneMiejsca);
      });
      this.dostepneMiejsca.next(noweDostepneMiejsca);
    });
  }

  getDostepneMiejsca(wycieczkaId: string): number {
    const dostepneMiejsca = this.dostepneMiejsca.value.get(wycieczkaId) || 0;
    console.log(`Dostępne miejsca dla wycieczki ${wycieczkaId}: ${dostepneMiejsca}`);
    return dostepneMiejsca;
  }
  

  async zakupWycieczki(): Promise<void> {
    const items = this.itemsSubject.value.filter(item => item.selected);
    
    for (let item of items) {
      const nowaIloscMiejsc = item.wycieczka.dostepneMiejsca - item.ilosc;
      await this.dataService.aktualizujIloscMiejsc(item.wycieczka.id, nowaIloscMiejsc);
    }
    const noweItems = this.itemsSubject.value.filter(item => !item.selected);
    this.itemsSubject.next(noweItems);
    console.log("Po zakupie, elementy w koszyku:", this.itemsSubject.value);

  }

  aktualizujZaznaczenie(wycieczkaId: string, selected: boolean): void {
    const items = this.itemsSubject.value;
    const znalezionyItem = items.find(item => item.wycieczka.id === wycieczkaId);
    if (znalezionyItem) {
      znalezionyItem.selected = selected;
    }
    this.itemsSubject.next(items);
  }
  
  
}
