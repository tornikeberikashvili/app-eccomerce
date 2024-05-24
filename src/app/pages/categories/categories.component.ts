import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {CategoryFacade} from "../../facades/category.facade";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {FeatureCardComponent} from "../../components/feature-card/feature-card.component";
import {FilterCardComponent} from "../../components/filter-card/filter-card.component";
import {
  FilterCardCheckboxItemComponent
} from "../../components/filter-card-checkbox-item/filter-card-checkbox-item.component";
import {ColorFacade} from "../../facades/color.facade";
import {ColorItemComponent} from "../../components/color-item/color-item.component";
import {Size, SIZES,} from "../../core/types/size.type";
import {ProductItemComponent} from "../../components/product-item/product-item.component";
import {ProductFacade} from "../../facades/product.facade";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    AsyncPipe,
    JsonPipe,
    FeatureCardComponent,
    FilterCardComponent,
    FilterCardCheckboxItemComponent,
    ColorItemComponent,
    ProductItemComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  route=inject(ActivatedRoute)
  categoryFacade=inject(CategoryFacade)
  colorFacade=inject(ColorFacade)
  productFacade=inject(ProductFacade)


  categories$ = this.categoryFacade.getCategories()
  colors$ = this.colorFacade.getColors()

    sizes=SIZES

  products$ = this.productFacade.getProducts()

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) // {id: "42"}
    });
  }
}
