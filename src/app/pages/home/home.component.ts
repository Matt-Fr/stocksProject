import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  enteredText = signal<string>('');

  checkInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());
  }
}
