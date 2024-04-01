// recenzja.service.ts
import { Injectable } from '@angular/core';
import { Recenzja } from '../models/recenzja.model';

@Injectable({
  providedIn: 'root'
})
export class RecenzjaService {
  private recenzje: { [wycieczkaId: string]: Recenzja[] } = {};

  constructor() {}

  dodajRecenzje(wycieczkaId: string, recenzja: Recenzja): void {
    if (!this.recenzje[wycieczkaId]) {
      this.recenzje[wycieczkaId] = [];
    }
    this.recenzje[wycieczkaId].push(recenzja);
    localStorage.setItem('recenzje', JSON.stringify(this.recenzje));
  }

  pobierzRecenzje(wycieczkaId: string): Recenzja[] {
    return this.recenzje[wycieczkaId] || [];
  }
  
}
