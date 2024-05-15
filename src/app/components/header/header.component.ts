import {Component, inject} from '@angular/core';
import {ButtonComponent} from "../../ui/button/button.component";
import {RouterLink} from "@angular/router";
import {AuthFacades} from "../../facades";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authFacade = inject(AuthFacades)

  get user(){
    return this.authFacade.user;
  }
  get isAuthenticated(){
    return this.authFacade.isAuthenticated;
  }

  logout() {
  this.authFacade.logout();
  }
}
