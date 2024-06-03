import {inject, Injectable} from "@angular/core";
import {ProductService} from "../services/product.service";
import {map} from "rxjs";

import {Product} from "../core/interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  productService=inject(ProductService)

  getProducts(params:{categoryId: string[], colorId?: string, size?: string}){
    return this.productService.getProducts()
      .pipe(
        map((products) => {
          return Object.keys(products).map((key: any) => ({
            ...products[key],
            id: key
          } as Product))
        }),
        map((products) =>products.filter((product) => params.categoryId.includes(product.categoryId)))
      )

  }

  getProduct(id: string){
    return this.productService.getProduct(id)
      .pipe(
        map((product) => ({
          ...product,
           id
        })as Product)
      )
  }
}
