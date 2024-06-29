import {Component, inject} from '@angular/core';
import {ButtonComponent} from "../../ui/button/button.component";
import {RouterLink} from "@angular/router";
import {AuthFacades} from "../../facades";
import {CategoryFacade} from "../../facades/category.facade";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {CartFacade} from "../../facades/cart.facade";
import {map} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    CdkMenuTrigger,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authFacade = inject(AuthFacades)
  categoryFacade = inject(CategoryFacade)
  cartFacade = inject(CartFacade)

  categories$ = this.categoryFacade.getCategories()

  cartCount$ = this.cartFacade.cart$.pipe(
    map((cart) => cart.filter(
      ( item) => item?.quantity && item.quantity > 0
    ).reduce((acc, item:any) => acc + (+item?.quantity * +item.price), 0))
    )


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
