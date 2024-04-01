import { Component, OnInit } from '@angular/core';

import { CurrencyService } from './services/currency.service';
import { KoszykService } from './services/koszyk.service';
import { KoszykItem } from './models/koszyk-item.model';
import { Zamowienie } from './models/zamowienie.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AdventureAwaits';
  suma: number = 0;
  showCartDropdown = false;
  koszykItems: KoszykItem[] = [];

  constructor(public currencyService: CurrencyService, private koszykService: KoszykService) {}

  zmienWalute(event: any) {
    this.currencyService.zmienWalute(event.target.value);
  }

  ngOnInit() {
    this.koszykService.items$.subscribe(items => {
      this.suma = items.reduce((sum, item) => sum + item.ilosc, 0);
      this.koszykItems = items;
    });
  }
}
