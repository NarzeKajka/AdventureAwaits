import { Component, OnInit } from '@angular/core';

import { HistoriaZamowienService } from '../../services/historia-zamowien.service';
import { Zamowienie } from '../../models/zamowienie.model';

@Component({
  selector: 'app-historia-zamowien',
  templateUrl: './historia-zamowien.component.html',
  styleUrls: ['./historia-zamowien.component.css']
})
export class HistoriaZamowienComponent implements OnInit {
  historia: Zamowienie[] = [];

  constructor(private historiaZamowienService: HistoriaZamowienService) { }

  ngOnInit(): void {
    this.historiaZamowienService.historia$.subscribe(historia => {
      this.historia = historia;
    });
  }

  sortuj(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    this.historia = [...this.historia].sort((a, b) => {
      if (a.status === value && b.status !== value) {
        return -1;
      }
      if (a.status !== value && b.status === value) {
        return 1;
      }
      return 0;
    });
  }
}