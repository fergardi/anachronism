import { Routes } from '@angular/router';
import { DatabaseComponent } from './database/database.component';
import { FinderComponent } from './finder/finder.component';

export const routes: Routes = [
  { path: 'database', component: DatabaseComponent },
  { path: 'finder', component: FinderComponent },
];
