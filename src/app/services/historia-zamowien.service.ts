import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Zamowienie } from '../models/zamowienie.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriaZamowienService {
  private historiaSubject = new BehaviorSubject<Zamowienie[]>([]);
  historia$ = this.historiaSubject.asObservable();

  dodajDoHistorii(zamowienie: Zamowienie): void {
    let aktualnaHistoria = this.historiaSubject.value;
    aktualnaHistoria.push(zamowienie);
    this.historiaSubject.next(aktualnaHistoria);
  }
}
