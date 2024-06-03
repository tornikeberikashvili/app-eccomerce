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

import { switchMap} from "rxjs";
import {Category} from "../../core/interfaces/category";
import {Product} from "../../core/interfaces/product";




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

  selectedCategories:Map<string, Category> = new Map()

  products:Product[]=[]






  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.getProducts([params['id']])
    })
  }


  getProducts(categoryId:string[]){
    return this.productFacade.getProducts({
      categoryId,

    })
      .subscribe(products => {
        console.log(products)
        this.products = products
      })

  }

  onCategoryChecked($event: {
    category: Category;
    checked: boolean;
  }) {
    if(!$event.checked){
      this.selectedCategories.delete($event.category.id)
    }else {
      this.selectedCategories.set($event.category.id, $event.category)
    }

    console.log(this.selectedCategories.keys())


    this.getProducts([...this.selectedCategories.keys()])


    console.log(this.selectedCategories.keys())
  }
}
