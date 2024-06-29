import {booleanAttribute, Component, Input,} from '@angular/core';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [],
  template:'<ng-content/>',
  host: {
    class: 'app-button',
    '[class.app-button--default]': 'size === "default"',
    '[class.app-button--small]': 'size === "small"',
    '[class.app-button--primary]': 'theme === "primary"',
    '[class.app-button--outline]': 'theme === "outline"',
    '[class.app-button--icon]': 'theme === "icon"',
    '[class.app-button--outline-icon]': 'theme === "outline-icon"',
    '[class.app-button--outline-black]': 'theme === "outline-black"',
    '[class.app-button--link]': 'theme === "link"',
    '[class.app-button--block]': 'block',

  }
})
export class ButtonComponent {
  @Input() size: 'default' | 'small' = 'default'
  @Input() theme: 'primary' | 'outline' | 'link' | 'icon'| 'outline-icon' = 'primary'
  @Input() disabled: boolean = false
  @Input({
    transform: booleanAttribute
  }) block: boolean = false
}
