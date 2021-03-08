import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductOrder} from '../models/product-order.model';
import {ProductOrders} from '../models/product-orders.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  private productsUrl = 'http://localhost:8080/api/produits';
  private ordersUrl = 'http://localhost:8080/api/commandes';

  private productOrder: ProductOrder;
  private orders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get(this.productsUrl);
  }

  getAllProductsAdmin() {
    return this.http.get(this.productsUrl + '/admin');
  }

  getProductGenre(genre): Observable<any> {
    return this.http.get(this.productsUrl + '/genre/' + genre);
  }

  getProductCategories(category): Observable<any> {
    return this.http.get(this.productsUrl + '/category/' + category);
  }

  getProductCategoryAndGenre(category,genre): Observable<any> {
    return this.http.get(this.productsUrl + '/sort/' + category + '/'+genre);
  }

  getProductMarqueAndGenre(marque,genre): Observable<any> {
    return this.http.get(this.productsUrl + '/marque/' + marque + '/'+genre);
  }

  getProductColorAndGenre(color,genre): Observable<any> {
    return this.http.get(this.productsUrl + '/colors/' + color + '/'+genre);
  }

  getProductQuality(quality): Observable<any> {
    return this.http.get(this.productsUrl + '/quality/' + quality);
  }

  saveOrder(order: ProductOrders) {
    console.log('je suis dans le service '+order);
    return this.http.post(this.ordersUrl, order);
  }

  set SelectedProductOrder(value: ProductOrder) {
    this.productOrder = value;
    this.productOrderSubject.next();
  }

  get SelectedProductOrder() {
    return this.productOrder;
  }

  set ProductOrders(value: ProductOrders) {
    this.orders = value;
    this.ordersSubject.next();
  }

  get ProductOrders() {
    return this.orders;
  }

  get Total() {
    return this.total;
  }

  set Total(value: number) {
    this.total = value;
    this.totalSubject.next();
  }


  saveProduct(form) {
    return this.http.post(this.productsUrl, form);
  }

  getProduct(id): Observable<any> {
    return this.http.get(this.productsUrl + '/' + id);
  }

  updatePicture(imageForm, id): Observable<any> {
    return this.http.post(this.productsUrl + '/upload/' + id, imageForm);
  }
  updatePictures(imageForm, id): Observable<any> {
    return this.http.post(this.productsUrl + '/uploads/' + id, imageForm);
  }

  updateProduct(currentProduct, id): Observable<any> {
    return this.http.put(this.productsUrl + '/' + id, currentProduct);
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(this.productsUrl + '/' + id);
  }
}
