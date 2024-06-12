import {Routes} from '@angular/router';
import {CategoriesComponent, HomeComponent, ProductComponent} from "./pages";
import {LeyoutComponent} from "./components";


export const routes: Routes = [
  {
    path: '',
    component: LeyoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes)
      },
      {
      path: 'product/:id',
        component: ProductComponent
      },
      {
        path: 'category',
        component: CategoriesComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.routes').then(m => m.profileRoutes),
      }
    ]

  },

  {
    path: '**',
    redirectTo: '/'
  }
];
