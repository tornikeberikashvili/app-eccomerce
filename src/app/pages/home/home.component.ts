import {Component, inject} from '@angular/core';
import {HeroBanerComponent} from "../../components/hero-baner/hero-baner.component";
import {FeatureCardComponent} from "../../components/feature-card/feature-card.component";
import {FEATURES} from "../../data/features";
import {CategoryFacade} from "../../facades/category.facade";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBanerComponent,
    FeatureCardComponent,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
features = FEATURES

  categoryFacade = inject(CategoryFacade)

  categories$ = this.categoryFacade.getCategories()
}
