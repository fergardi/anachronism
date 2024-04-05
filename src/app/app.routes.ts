import { Routes } from '@angular/router';
import { DatabaseComponent } from './database/database.component';
import { BuilderComponent } from './builder/builder.component';

export const routes: Routes = [
  { path: 'database', component: DatabaseComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'builder/:deck', component: BuilderComponent },
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: '**', redirectTo: 'builder', pathMatch: 'full' },
];
