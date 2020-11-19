import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}
@Injectable({providedIn: 'root'})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Pap/Rice/Samp with Chicken feet', price: 48.99, amount: 0 },
    { id: 1, name: 'Pap/Rice/Samp with Stew meat', price: 64.99, amount: 0 },
    { id: 2, name: 'Pap/Rice/Samp with Curry Chicken stew', price: 59.99, amount: 0 },
    { id: 3, name: 'Steamed bread with stew meat/ Chicken liver', price: 49.99, amount: 0 },
    { id: 0, name: 'All soft drinks (440ml) and energy drinks', price: 12.99, amount: 0 },
    { id: 0, name: 'all juice flavors', price: 15.99, amount: 0 }

  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor() {}
 
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}