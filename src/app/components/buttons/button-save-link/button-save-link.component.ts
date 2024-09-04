import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-save-link',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  templateUrl: './button-save-link.component.html',
  styleUrl: './button-save-link.component.css',
})
export class ButtonSaveLinkComponent {
  text = input<string>();
  url = input<string>();
  checked: boolean = false;
}
