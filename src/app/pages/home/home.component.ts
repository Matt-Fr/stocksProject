import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  enteredText = signal<string>('');

  searchBarError = false;
  constructor(private router: Router) {}

  checkInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());
    this.router.navigate([`/${this.enteredText()}`]);
  }
}
