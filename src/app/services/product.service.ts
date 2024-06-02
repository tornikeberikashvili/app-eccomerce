import {Injectable} from '@angular/core';
import {ApiService} from "../core/services";
import {FirebaseDocument} from "../core/interfaces/firebase-document";
import {Product} from "../core/interfaces/product";
import {tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {


  getProducts(categoryId: string) {
    return this.get<FirebaseDocument<Product>[]>('products.json',{

      orderBy: '"categoryId"',
      equalTo:  `"${categoryId}"`


    }).pipe(
      tap(products => {
        console.log(products)
      }
    ))
    }



  getProduct(id: string) {
    return this.get<FirebaseDocument<Product>>(`products/${id}.json`);
  }


}
