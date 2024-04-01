import { Injectable } from '@angular/core';
import { Wycieczka } from '../models/wycieczka.model';
import { Observable, map, of , from } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  pobierzWycieczki(): Observable<Wycieczka[]> {
    return this.db.list<Wycieczka>('wycieczki').valueChanges();
  }

  pobierzWycieczkePoNazwie(nazwa: string): Observable<Wycieczka | undefined> {
    return this.pobierzWycieczki().pipe(
      map(wycieczki => wycieczki.find(w => w.nazwa === nazwa))
    );
  }

  pobierzWycieczkePoId(wycieczkaId: string): Observable<Wycieczka | undefined> {
    return this.pobierzWycieczki().pipe(
      map(wycieczki => wycieczki.find(w => w.id === wycieczkaId))
    );
  }

  async usunWycieczke(wycieczkaId: string): Promise<any> {
    await this.db.list<Wycieczka>('wycieczki').remove(wycieczkaId);
  }
  
  async aktualizujIloscMiejsc(wycieczkaId: string, nowaIloscMiejsc: number): Promise<void> {
    await this.db.object(`/wycieczki/${wycieczkaId}`).update({ dostepneMiejsca: nowaIloscMiejsc });
  }

  async dodajWycieczke(wycieczka: Wycieczka): Promise<void> {
    wycieczka.dostepneMiejsca = wycieczka.maxMiejsca;
    wycieczka.zdjecie.push('karuzela1.png', 'karuzela2.png');

    const newRef = await this.db.list<Wycieczka>('wycieczki').push(wycieczka);
    wycieczka.id = newRef.key as string;
    await this.db.object(`/wycieczki/${wycieczka.id}`).set(wycieczka);
  }
  
}
