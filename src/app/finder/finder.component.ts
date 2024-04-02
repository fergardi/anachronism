import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

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

import { Card, cards, empty} from '../model/card';

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
    CdkDropList, 
    CdkDrag,
  ],
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss'
})
export class FinderComponent {
  cards: Card[] = cards;
  deck: Card[] = [];

  filters: FormGroup;
  search: FormGroup;

  cultures: string[] = [];
  types: string[] = [];
  subtypes: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.cultures = Array.from(new Set(this.cards.map(card => card.culture)));
    this.types = Array.from(new Set(this.cards.map(card => card.type)));
    this.subtypes = Array.from(new Set(this.cards.map(card => card.subtype)));

    this.filters = this.formBuilder.group({
      name: this.formBuilder.control(''),
      text: this.formBuilder.control(''),
      cultures: this.formBuilder.control([]),
      types: this.formBuilder.control([]),
      subtypes: this.formBuilder.control([]),
    });

    this.search = this.formBuilder.group({
      query: this.formBuilder.control(''),
    });

    this.resetAll();
  }

  resetAll() {
    this.resetFilters();
    this.resetSearch();
    this.resetDeck();
  }

  resetFilters() {
    this.filters.patchValue({
      'name': '',
      'text': '',
      'cultures': [],
      'types': [],
      'subtypes': []
    });
  }

  resetSearch() {
    this.search.patchValue({
      'query': ''
    });
  }

  filteredCards(): Card[] {
    return this.cards
      .filter(card => card.name.toLowerCase().includes(this.search.get('query')?.value.toLowerCase()))
      .filter(card => card.name.toLowerCase().includes(this.filters.get('name')?.value.toLowerCase()))
      .filter(card => card.text.toLowerCase().includes(this.filters.get('text')?.value.toLowerCase()))
      .filter(card => this.filters.get('cultures')?.value.length > 0 ? this.filters.get('cultures')?.value.includes(card.culture) : true)
      .filter(card => this.filters.get('types')?.value.length > 0 ? this.filters.get('types')?.value.includes(card.type) : true)
      .filter(card => this.filters.get('subtypes')?.value.length > 0 ? this.filters.get('subtypes')?.value.includes(card.subtype) : true);
  }

  resetDeck() {
    // this.deck = [empty, empty, empty, empty, empty];
    this.deck = cards.slice(0, 5);
  }

  drop(event: CdkDragDrop<Card[]>) {
    moveItemInArray(this.deck, event.previousIndex, event.currentIndex);
  }

}
