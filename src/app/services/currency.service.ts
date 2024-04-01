import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private waluta = new BehaviorSubject<string>('PLN');
  walutaObs$ = this.waluta.asObservable();

  private kursyWalut: { [key: string]: number } = {
    PLN: 1,
    USD: 0.25,
    EUR: 0.22
  };

  constructor() {}

  zmienWalute(nowaWaluta: string) {
    this.waluta.next(nowaWaluta);
  }

  przeliczCene(cenaPLN: number): number {
    return cenaPLN * this.kursyWalut[this.waluta.value];
  }

  pobierzSymbolWaluty(): string {
    return this.waluta.value;
  }
}
