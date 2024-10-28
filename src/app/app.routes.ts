import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { StockComponent } from './pages/stock/stock.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'ticker/:ticker', component: StockComponent },
];
