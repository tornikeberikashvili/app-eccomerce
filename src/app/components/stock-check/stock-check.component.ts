import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-stock-check',
  standalone: true,
  imports: [
  ],
  templateUrl: './stock-check.component.html',
  styleUrl: './stock-check.component.scss'
})
export class StockCheckComponent {
  @Input() inStock?: boolean = false
}
