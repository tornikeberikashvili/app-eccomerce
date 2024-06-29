import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "../core/interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class CartFacade {

  cart = new BehaviorSubject<Product[]>([])

  cart$ = this.cart.asObservable()

  constructor() {
  this.cart.next(this.getFromLocalStorage())
  }

setToLocalStorage(cart: any) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart)

}

getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

 addToCart(product: any,quantity: number=1) {
    console.log('Product added to cart', product);
    const cart = this.getFromLocalStorage();
    if(cart.find((item: any) => item.id === product.id)){
      this.updateCart(product,quantity)
      return;
    }
   this.setToLocalStorage([...cart, product])
  }

  removeFromCart(product: any) {
    const cart = this.getFromLocalStorage();
    this.setToLocalStorage(cart.filter((item: any) => item.id !== product.id));
  }

  updateCart(product: any,quantity: number=1) {
    console.log('Cart updated', product);
    const cart = this.getFromLocalStorage();
    const updatedCart = cart.map((item: any) => {
      if (item.id === product.id) {
        return {...item,
          quantity:quantity
        };
      }
      return item;
    });
    this.setToLocalStorage(updatedCart);
  }

}
