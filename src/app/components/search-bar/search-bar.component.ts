import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() checkEnteredText = new EventEmitter<string>();
  enteredText = signal('');

  onSubmit() {
    // console.log('submitted!');
    this.checkEnteredText.emit(this.enteredText());
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.enteredText.set(inputElement.value.toUpperCase());
    }
  }
}
