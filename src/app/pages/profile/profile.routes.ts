import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {PasswordUpdateComponent} from "./password-update/password-update.component";
import {AddressComponent} from "./address/address.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {OrdersComponent} from "./orders/orders.component";
import {authGuard} from "../../core/guards";

export  const profileRoutes:Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'myProfile',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent,

      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'password',
        component: PasswordUpdateComponent,
      },
      {
        path: 'myProfile',
        component: MyProfileComponent,
      }

    ]
  }
]
