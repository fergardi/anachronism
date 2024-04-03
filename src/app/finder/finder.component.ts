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
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
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
  elements: any[] = []; // to allow nulls
  handsMin: number = 0;
  handsMax: number = 0;
  initiativeMin: number = 0;
  initiativeMax: number = 0;
  lifeMin: number = 0;
  lifeMax: number = 0;
  speedMin: number = 0;
  speedMax: number = 0;
  experienceMin: number = 0;
  experienceMax: number = 0;
  damageMin: number = 0;
  damageMax: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.cultures = Array.from(new Set(this.cards.map(card => card.culture)));
    this.types = Array.from(new Set(this.cards.map(card => card.type)));
    this.subtypes = Array.from(new Set(this.cards.map(card => card.subtype)));
    this.elements = Array.from(new Set(this.cards.filter(card => card.element != null).map(card => card.element)));
    this.handsMin = this.cards.reduce((min, card) => card.hands != null && card.hands < min ? card.hands : min, 0);
    this.handsMax = this.cards.reduce((max, card) => card.hands != null && card.hands > max ? card.hands : max, 0);
    this.initiativeMin = this.cards.reduce((min, card) => card.initiative != null && card.initiative < min ? card.initiative : min, 0);
    this.initiativeMax = this.cards.reduce((max, card) => card.initiative != null && card.initiative > max ? card.initiative : max, 0);
    this.lifeMin = this.cards.reduce((min, card) => card.life != null && card.life < min ? card.life : min, 0);
    this.lifeMax = this.cards.reduce((max, card) => card.life != null && card.life > max ? card.life : max, 0);
    this.speedMin = this.cards.reduce((min, card) => card.speed != null && card.speed < min ? card.speed : min, 0);
    this.speedMax = this.cards.reduce((max, card) => card.speed != null && card.speed > max ? card.speed : max, 0);
    this.experienceMin = this.cards.reduce((min, card) => card.experience != null && card.experience < min ? card.experience : min, 0);
    this.experienceMax = this.cards.reduce((max, card) => card.experience != null && card.experience > max ? card.experience : max, 0);
    this.damageMin = this.cards.reduce((min, card) => card.damage != null && card.damage < min ? card.damage : min, 0);
    this.damageMax = this.cards.reduce((max, card) => card.damage != null && card.damage > max ? card.damage : max, 0);

    this.filters = this.formBuilder.group({
      name: this.formBuilder.control(''),
      text: this.formBuilder.control(''),
      cultures: this.formBuilder.control([]),
      types: this.formBuilder.control([]),
      subtypes: this.formBuilder.control([]),
      handsMin: this.formBuilder.control(this.handsMin),
      handsMax: this.formBuilder.control(this.handsMax),
      grid_1_1: this.formBuilder.control(''),
      grid_1_2: this.formBuilder.control(''),
      grid_1_3: this.formBuilder.control(''),
      grid_2_1: this.formBuilder.control(''),
      grid_2_2: this.formBuilder.control(''),
      grid_2_3: this.formBuilder.control(''),
      grid_3_1: this.formBuilder.control(''),
      grid_3_2: this.formBuilder.control(''),
      grid_3_3: this.formBuilder.control(''),
      grid_4_1: this.formBuilder.control(''),
      grid_4_2: this.formBuilder.control(''),
      grid_4_3: this.formBuilder.control(''),
      elements: this.formBuilder.control([]),
      initiativeMin: this.formBuilder.control(this.initiativeMin),
      initiativeMax: this.formBuilder.control(this.initiativeMax),
      lifeMin: this.formBuilder.control(this.lifeMin),
      lifeMax: this.formBuilder.control(this.lifeMax),
      speedMin: this.formBuilder.control(this.speedMin),
      speedMax: this.formBuilder.control(this.speedMax),
      experienceMin: this.formBuilder.control(this.experienceMin),
      experienceMax: this.formBuilder.control(this.experienceMax),
      damageMin: this.formBuilder.control(this.damageMin),
      damageMax: this.formBuilder.control(this.damageMax),
      isMultipleWeapon: this.formBuilder.control(false),
      isMultipleArmor: this.formBuilder.control(false),
      isMultipleInspiration: this.formBuilder.control(false),
      isMultipleSpecial: this.formBuilder.control(false),
      isReveal: this.formBuilder.control(false),
      isAction: this.formBuilder.control(false),
      isRivalry: this.formBuilder.control(false),
      isDiscard: this.formBuilder.control(false),
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
      'subtypes': [],
      'handsMin': 0,
      'handsMax': 2,
      'grid_1_1': '',
      'grid_1_2': '',
      'grid_1_3': '',
      'grid_2_1': '',
      'grid_2_2': '',
      'grid_2_3': '',
      'grid_3_1': '',
      'grid_3_2': '',
      'grid_3_3': '',
      'grid_4_1': '',
      'grid_4_2': '',
      'grid_4_3': '',
      'elements': [],
      'initiativeMin': this.initiativeMin,
      'initiativeMax': this.initiativeMax,
      'lifeMin': this.lifeMin,
      'lifeMax': this.lifeMax,
      'speedMin': this.speedMin,
      'speedMax': this.speedMax,
      'experienceMin': this.experienceMin,
      'experienceMax': this.experienceMax,
      'damageMin': this.damageMin,
      'damageMax': this.damageMax,
      'isMultipleWeapon': false,
      'isMultipleArmor': false,
      'isMultipleInspiration': false,
      'isMultipleSpecial': false,
      'isReveal': false,
      'isAction': false,
      'isRival': false,
      'isDiscard': false,
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
      .filter(card => this.filters.get('subtypes')?.value.length > 0 ? this.filters.get('subtypes')?.value.includes(card.subtype) : true)
      .filter(card => card.hands != null ? card.hands >= this.filters.get('handsMin')?.value : this.filters.get('handsMin')?.value == 0) // only include null values if the min is 0
      .filter(card => card.hands != null ? card.hands <= this.filters.get('handsMax')?.value : true)
      .filter(card => card.grid_1_1.toLowerCase().includes(this.filters.get('grid_1_1')?.value.toLowerCase()))
      .filter(card => card.grid_1_2.toLowerCase().includes(this.filters.get('grid_1_2')?.value.toLowerCase()))
      .filter(card => card.grid_1_3.toLowerCase().includes(this.filters.get('grid_1_3')?.value.toLowerCase()))
      .filter(card => card.grid_2_1.toLowerCase().includes(this.filters.get('grid_2_1')?.value.toLowerCase()))
      .filter(card => card.grid_2_2.toLowerCase().includes(this.filters.get('grid_2_2')?.value.toLowerCase()))
      .filter(card => card.grid_2_3.toLowerCase().includes(this.filters.get('grid_2_3')?.value.toLowerCase()))
      .filter(card => card.grid_3_1.toLowerCase().includes(this.filters.get('grid_3_1')?.value.toLowerCase()))
      .filter(card => card.grid_3_2.toLowerCase().includes(this.filters.get('grid_3_2')?.value.toLowerCase()))
      .filter(card => card.grid_3_3.toLowerCase().includes(this.filters.get('grid_3_3')?.value.toLowerCase()))
      .filter(card => card.grid_4_1.toLowerCase().includes(this.filters.get('grid_4_1')?.value.toLowerCase()))
      .filter(card => card.grid_4_2.toLowerCase().includes(this.filters.get('grid_4_2')?.value.toLowerCase()))
      .filter(card => card.grid_4_3.toLowerCase().includes(this.filters.get('grid_4_3')?.value.toLowerCase()))
      .filter(card => this.filters.get('elements')?.value.length > 0 ? this.filters.get('elements')?.value.includes(card.element) : true)
      .filter(card => card.initiative != null ? card.initiative >= this.filters.get('initiativeMin')?.value : this.filters.get('initiativeMin')?.value == 0) // only include null values if the min is 0
      .filter(card => card.initiative != null ? card.initiative <= this.filters.get('initiativeMax')?.value : true)
      .filter(card => card.life != null ? card.life >= this.filters.get('lifeMin')?.value : this.filters.get('lifeMin')?.value == 0) // only include null values if the min is 0
      .filter(card => card.life != null ? card.life <= this.filters.get('lifeMax')?.value : true)
      .filter(card => card.speed != null ? card.speed >= this.filters.get('speedMin')?.value : this.filters.get('speedMin')?.value == 0) // only include null values if the min is 0
      .filter(card => card.speed != null ? card.speed <= this.filters.get('speedMax')?.value : true)
      .filter(card => card.experience != null ? card.experience >= this.filters.get('experienceMin')?.value : this.filters.get('experienceMin')?.value == 0) // only include null values if the min is 0
      .filter(card => card.experience != null ? card.experience <= this.filters.get('experienceMax')?.value : true)
      .filter(card => card.damage != null ? card.damage >= this.filters.get('damageMin')?.value : this.filters.get('damageMin')?.value == 0) // only include null values if the min is 0
      .filter(card => card.damage != null ? card.damage <= this.filters.get('damageMax')?.value : true)
      .filter(card => this.filters.get('isMultipleWeapon')?.value ? this.filters.get('isMultipleWeapon')?.value == card.multiple_weapons : true)
      .filter(card => this.filters.get('isMultipleArmor')?.value ? this.filters.get('isMultipleArmor')?.value == card.multiple_armors : true)
      .filter(card => this.filters.get('isMultipleInspiration')?.value ? this.filters.get('isMultipleInspiration')?.value == card.multiple_inspirations : true)
      .filter(card => this.filters.get('isMultipleSpecial')?.value ? this.filters.get('isMultipleSpecial')?.value == card.multiple_specials : true)
      .filter(card => this.filters.get('isReveal')?.value ? this.filters.get('isReveal')?.value == card.reveal : true)
      .filter(card => this.filters.get('isAction')?.value ? this.filters.get('isAction')?.value == card.action : true)
      .filter(card => this.filters.get('isRival')?.value ? this.filters.get('isRival')?.value == card.rivalry : true)
      .filter(card => this.filters.get('isDiscard')?.value ? this.filters.get('isDiscard')?.value == card.discards : true)
      ;
  }

  addToDeck(card: Card) {
    let firstEmptyCard: number = this.deck.findIndex(c => c.name === empty.name);
    if (firstEmptyCard >= 0) {
      this.deck.splice(firstEmptyCard, 1, card);
    }
  }

  removeFromDeck(index: number) {
    this.deck.splice(index, 1);
    this.deck.push(empty);
  }

  resetDeck() {
    this.deck = [empty, empty, empty, empty, empty];
  }

  drop(event: CdkDragDrop<Card[]>) {
    moveItemInArray(this.deck, event.previousIndex, event.currentIndex);
  }

}
