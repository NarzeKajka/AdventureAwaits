// recenzja.model.ts
export interface Recenzja {
  nick: string;
  gwiazdki: number;
  tekst: string;
  dataZakupu: Date | null;
  nazwa: string; // identyfikator wycieczki
}
