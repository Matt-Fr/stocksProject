import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent {}
