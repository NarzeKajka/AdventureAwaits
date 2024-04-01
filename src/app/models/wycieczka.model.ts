export class Wycieczka {
  id: string;
  nazwa: string;
  kraj: string;
  lokalizacja: string;
  dataRozpoczecia: Date;
  dataZakonczenia: Date;
  cena: number;
  maxMiejsca: number;
  dostepneMiejsca: number;
  opisk: string; // krótki opis
  opisd: string; // długi opis
  zdjecie: string[]; // tablica linków do zdjęć

  constructor(
    id: string,
    nazwa: string,
    kraj: string,
    lokalizacja: string,
    dataRozpoczecia: Date,
    dataZakonczenia: Date,
    cena: number,
    maxMiejsca: number,
    dostepneMiejsca: number,
    opisk: string,
    opisd: string,
    zdjecie: string[]
  ) {
    this.id = id;
    this.nazwa = nazwa;
    this.kraj = kraj;
    this.lokalizacja = lokalizacja;
    this.dataRozpoczecia = dataRozpoczecia;
    this.dataZakonczenia = dataZakonczenia;
    this.cena = cena;
    this.maxMiejsca = maxMiejsca;
    this.dostepneMiejsca = dostepneMiejsca;
    this.opisk = opisk;
    this.opisd = opisd;
    this.zdjecie = zdjecie;
  }
}
