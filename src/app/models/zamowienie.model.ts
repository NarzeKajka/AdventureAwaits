import { Wycieczka } from './wycieczka.model';

export interface Zamowienie {
    numerZamowienia?: string;
    wycieczka: Wycieczka;
    ilosc: number;
    dataZakupu: Date;
    status: 'przed' | 'w trakcie' | 'zakończona';
  }
  