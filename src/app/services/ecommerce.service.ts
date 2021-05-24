import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductOrder} from '../models/product-order.model';
import {ProductOrders} from '../models/product-orders.model';
import {Observable} from 'rxjs';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  currentUser: User;
  headers: HttpHeaders;
  formHeaders: HttpHeaders;

  private productsUrl = 'http://localhost:8181/api/produits';
  private ordersUrl = 'http://localhost:8181/api/commandes';

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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
  }

  getAllProducts(): Observable<any>  {
    return this.http.get(this.productsUrl + '/all');
  }

  getAllProductsAdmin(): Observable<any>  {
    return this.http.get(this.productsUrl + '/admin',  {headers: this.headers});
  }

  getAllMobile(): Observable<any> {
    return this.http.get(this.productsUrl + '/all/mobile');
  }

  getAllProductsBoutique(id): Observable<any> {
    return this.http.get(this.productsUrl + '/boutique/' + id, {headers: this.headers});
  }

  getProductGenre(genre): Observable<any> {
    return this.http.get(this.productsUrl + '/all/genre/' + genre);
  }

  getProductCategories(category): Observable<any> {
    return this.http.get(this.productsUrl + '/all/category/' + category);
  }

  getProductCategoryAndGenre(category, type): Observable<any> {
    return this.http.get(this.productsUrl + '/all/sort/' + category + '/' + type);
  }

 getProductQuantity(quantity,id): Observable<any> {
    return  this.http.get(this.productsUrl + '/add/quantity/' +id, {params: quantity});
 }

 countProduitByLocation(location, produitName): Observable<any> {
    return this.http.get(this.productsUrl + '/quantity/byLocation/' +location, {params: produitName});
  }

  removeProduitQuantity(quantity, id): Observable<any> {
       return this.http.get(this.productsUrl + '/remove/quantity/' +id, {params: quantity});
  }

  getProductType(type): Observable<any> {
    return this.http.get(this.productsUrl + '/all/type/' + type);
  }

  saveOrder(order: ProductOrders): Observable<any>  {
    console.log('je suis dans le service ' + order);
    return this.http.post(this.ordersUrl, order);
  }

  set SelectedProductOrder(value: ProductOrder){
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

  get ProductOrders(){
    return this.orders;
  }

  get Total() {
    return this.total;
  }

  set Total(value: number) {
    this.total = value;
    this.totalSubject.next();
  }


  saveProduct(form, id): Observable<any>  {
    return this.http.post(this.productsUrl + '/admin/' + id, form, {headers: this.formHeaders});
  }

  getProduct(id): Observable<any> {
    return this.http.get(this.productsUrl + '/' + id);
  }

  updatePicture(imageForm, id): Observable<any> {
    return this.http.post(this.productsUrl + '/admin/upload/' + id, imageForm, {headers: this.formHeaders});
  }
  updatePictures(imageForm, id): Observable<any> {
    return this.http.post(this.productsUrl + '/admin/uploads/' + id, imageForm, {headers: this.formHeaders});
  }

  updateProduct(currentProduct, id): Observable<any> {
    return this.http.put(this.productsUrl + '/admin/' + id, currentProduct, {headers: this.formHeaders});
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(this.productsUrl + '/admin/' + id, {headers: this.headers});
  }
}
