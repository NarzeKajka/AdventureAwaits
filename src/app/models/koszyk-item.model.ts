import { Wycieczka } from './wycieczka.model';

export interface KoszykItem {
  wycieczka: Wycieczka;
  ilosc: number;
  selected: boolean;
}