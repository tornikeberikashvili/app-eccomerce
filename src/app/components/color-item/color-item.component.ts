import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'app-color-item',
  standalone: true,
  imports: [],
  templateUrl: './color-item.component.html',
  styleUrl: './color-item.component.scss'
})
export class ColorItemComponent {
@Input() color:string='#8badff'

  @Input({
    transform:booleanAttribute
  }) active=false
}
