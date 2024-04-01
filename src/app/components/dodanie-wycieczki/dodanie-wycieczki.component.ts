import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { Wycieczka } from '../../models/wycieczka.model';


@Component({
  selector: 'app-dodanie-wycieczki',
  templateUrl: './dodanie-wycieczki.component.html',
  styleUrl: './dodanie-wycieczki.component.css'
})
export class DodanieWycieczkiComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nazwa: ['', Validators.required],
      kraj: ['', Validators.required],
      lokalizacja: [''], // opcjonalne
      dataRozpoczecia: ['', Validators.required],
      dataZakonczenia: ['', Validators.required],
      cena: ['', [Validators.required, Validators.min(1)]],
      maxMiejsca: ['', [Validators.required, Validators.min(1)]],
      opisk: ['', Validators.required],
      opisd: ['', Validators.required],
      zdjecie: ['', Validators.required]
    }, { validator: this.dateRangeValidator });
  }

  dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const poczatek = control.get('dataRozpoczecia')?.value;
    const koniec = control.get('dataZakonczenia')?.value;
    return poczatek && koniec && new Date(poczatek) < new Date(koniec) ? null : { 'dateRangeError': true };
  };

  dodajWycieczke(): void {
    if (this.form.valid) {
      const nowaWycieczka: Wycieczka = {
        ...this.form.value,
        id: '', // Id zostanie dodane w Firebase
        zdjecie: [this.form.value.zdjecie, 'karuzela1.png', 'karuzela2.png']
      };
      this.dataService.dodajWycieczke(nowaWycieczka).then(() => {
        this.router.navigate(['/wycieczki']);
      });
    }
  }
  
  powrot(): void {
    this.router.navigate(['/wycieczki']);
  }
}
