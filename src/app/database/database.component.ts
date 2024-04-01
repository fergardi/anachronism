import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {Card, cards} from '../model/card';

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['number', 'set', 'name', 'initiative', 'element', 'race', 'type', 'subtype', 'ability'];
  dataSource: MatTableDataSource<Card>;

  constructor() {
    this.dataSource = new MatTableDataSource(cards);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyIndividualFilter(column: string, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Card, filter: string) => {
      const value = data[column];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filter.toLowerCase());
      } else if (typeof value === 'number' && !isNaN(value)) {
        return value.toString().toLowerCase().includes(filter.toLowerCase());
      }
      return false;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
