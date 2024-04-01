import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import {Card, cards} from '../model/card';

@Component({
  selector: 'app-finder',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss'
})
export class FinderComponent {
  cards: Card[] = cards;

  filters: FormGroup;
  cultures: string[] = [];
  types: string[] = [];
  subtypes: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.cultures = Array.from(new Set(this.cards.map(card => card.culture)));
    this.types = Array.from(new Set(this.cards.map(card => card.type)));
    this.subtypes = Array.from(new Set(this.cards.map(card => card.subtype)));

    this.filters = this.formBuilder.group({
      filteredName: this.formBuilder.control(''),
      filteredText: this.formBuilder.control(''),
      filteredCultures: this.formBuilder.control([]),
      filteredTypes: this.formBuilder.control([]),
      filteredSubtypes: this.formBuilder.control([]),
    });

    this.resetFilters();
  }

  resetFilters() {
    this.filters.patchValue({
      'filteredName': '',
      'filteredText': '',
      'filteredCultures': [],
      'filteredTypes': [],
      'filteredSubtypes': []
    });
  }

  filteredCards(): Card[] {
    return this.cards
      .filter(card => card.name.toLowerCase().includes(this.filters.get('filteredName')?.value.toLowerCase()))
      .filter(card => card.text.toLowerCase().includes(this.filters.get('filteredText')?.value.toLowerCase()))
      .filter(card => this.filters.get('filteredCultures')?.value.length > 0 ? this.filters.get('filteredCultures')?.value.includes(card.culture) : true)
      .filter(card => this.filters.get('filteredTypes')?.value.length > 0 ? this.filters.get('filteredTypes')?.value.includes(card.type) : true)
      .filter(card => this.filters.get('filteredSubtypes')?.value.length > 0 ? this.filters.get('filteredSubtypes')?.value.includes(card.subtype) : true);
  }

}
