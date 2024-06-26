import {booleanAttribute, Component, EventEmitter, Input, Output,} from '@angular/core';

import {Category} from "../../core/interfaces/category";


@Component({
  selector: 'app-filter-card-checkbox-item',
  standalone: true,
  imports: [],
  templateUrl: './filter-card-checkbox-item.component.html',
  styleUrl: './filter-card-checkbox-item.component.scss'
})
export class FilterCardCheckboxItemComponent {

  @Input() category: Category = {} as Category;
  @Input({
    transform: booleanAttribute
  }) active: boolean = false;
  @Output() checked: EventEmitter<{
    category: Category;
    checked: boolean;
  }> = new EventEmitter<{
    category: Category;
    checked: boolean;
  }
  >();

  changed($event: Event) {
    this.checked.emit({
      category: this.category,
      checked: ($event.target as HTMLInputElement).checked
    })
  }
}
