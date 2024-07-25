import {
  Component,
  EventEmitter,
  input,
  output,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  checkEnteredText = output<string>();
  enteredText = signal('');

  onSubmit() {
    console.log('submitted!');
    this.checkEnteredText.emit(this.enteredText());
  }
}
