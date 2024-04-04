import { Routes } from '@angular/router';
import { DatabaseComponent } from './database/database.component';
import { BuilderComponent } from './builder/builder.component';

export const routes: Routes = [
  { path: 'database', component: DatabaseComponent },
  // { path: 'builder', redirectTo: 'builder/', pathMatch: 'full' },
  { path: 'builder', component: BuilderComponent },
  { path: 'builder/:hash', component: BuilderComponent },
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: '**', redirectTo: 'builder', pathMatch: 'full' },
];
