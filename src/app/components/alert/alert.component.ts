import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";



@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
@Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
@Input() message = ''
}
