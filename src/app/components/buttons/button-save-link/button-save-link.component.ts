import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-button-save-link',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    ToggleButtonModule,
    FormsModule,
    ButtonGroupModule,
  ],
  templateUrl: './button-save-link.component.html',
  styleUrl: './button-save-link.component.css',
})
export class ButtonSaveLinkComponent {
  text = input<string>();
  url = input<string>();
  checked: boolean = false;
}
