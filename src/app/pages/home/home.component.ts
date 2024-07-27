import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  searchBarError = false;

  // ngOnInit(): void {
  //   const subscription = this.httpClient
  //     .get(
  //       `https://api.polygon.io/v2/aggs/ticker/MSFT/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${environment.apiKeyPolygon}`
  //     )
  //     .subscribe({
  //       next: (resData) => {
  //         console.log(resData);
  //       },
  //     });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  checkInput(data: string) {
    this.enteredText.set(data);
    console.log(this.enteredText());
  }
}
