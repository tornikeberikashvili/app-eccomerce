import {Component, inject} from '@angular/core';
import {map, mergeMap, Observable, share, shareReplay, switchMap} from "rxjs";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgIf} from "@angular/common";
import {CategoryService} from "../../services/categoty.service";
import {ProductFacade} from "../../facades/product.facade";
import {CategoryFacade} from "../../facades/category.facade";
import {ColorFacade} from "../../facades/color.facade";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {ReviewComponent} from "../../components/review/review.component";
import {StockCheckComponent} from "../../components/stock-check/stock-check.component";
import {ColorItemComponent} from "../../components/color-item/color-item.component";
import {Color} from "../../core/interfaces/color";
import {SizeItemComponent} from "../../components/size-item/size-item.component";
import {Product} from "../../core/interfaces/product";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    BreadcrumbComponent,
    ReviewComponent,
    NgIf,
    StockCheckComponent,
    CurrencyPipe,
    ColorItemComponent,
    SizeItemComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {


  route = inject(ActivatedRoute)
  productFacade = inject(ProductFacade)
  categoryFacade = inject(CategoryFacade)
  colorFacade = inject(ColorFacade)
  selectedColor?: string

  product$:Observable<Product> = this.route.params.pipe(
    switchMap((params: any) => this.productFacade.getProduct(params['id'])
      .pipe(
        map(product => {
          let cover
          if (product.images && product.images.length) {
            cover = product.images[0]
          }

          return {
            ...product,
            cover
          }
        }),

        mergeMap(product => this.categoryFacade.getCategoryById(product.categoryId)
          .pipe(
            map(category => ({...product, category}))
          )
        ),
        mergeMap(productWithCategory => this.colorFacade.getColorById(productWithCategory.colorId)
          .pipe(
            map(color => ({
              ...productWithCategory, color}))
          )
        ),
      )
    )
  )


  selectColor($event: Color) {


  }
}
