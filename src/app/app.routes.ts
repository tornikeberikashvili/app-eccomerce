import {Routes} from '@angular/router';
import {CategoriesComponent, HomeComponent} from "./pages";
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
        path: 'category/:id',
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
