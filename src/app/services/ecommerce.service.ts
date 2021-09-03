import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductOrder} from '../models/product-order.model';
import {ProductOrders} from '../models/product-orders.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../models/user';
import {API} from "../../environments/environment";
import { catchError } from 'rxjs/operators';


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
    this.headers = (this.currentUser==null || this.currentUser == undefined) ? new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    }):new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });

    this.formHeaders = (this.currentUser==null || this.currentUser == undefined) ? new HttpHeaders({}):new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token
    });
  }
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  getAllProducts(): Observable<any>  {
    return this.http.get(`${API.PRODUITS}/all`).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllProductsSearch(form): Observable<any>  {
    console.log(form);
    return this.http.post(`${API.PRODUITS}/all`, form).pipe(
      catchError(this.errorHandler)
    );
  }
  getAllProductsSearchLike(form): Observable<any>  {
    console.log(form);
    return this.http.post(`${API.PRODUITS}/all/search`, form).pipe(
      catchError(this.errorHandler)
    );
  }
  getAllProductsSearchByProvince(province,form): Observable<any>  {
    console.log(form);
    console.log(province);
    
    return this.http.post(`${API.PRODUITS}/all/province/${province}`, form).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllProductsSearchBylocation(province,form): Observable<any>  {
    console.log(form);
    console.log(province);
    
    return this.http.post(`${API.PRODUITS}/all/search/${province}`, form).pipe(
      catchError(this.errorHandler)
    );
  }

  getOrderByProduct(id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/produits/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }
  getCoachingOrders(id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/coachings/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllProductsAdmin(): Observable<any>  {
    return this.http.get(`${API.PRODUITS}/admin`,  {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  findAllQuantityOfProductAvailable(form): Observable<any> {
    return this.http.get(API.PRODUITS+'/admin/quantity/dispo/'+form.region+'/'+form.category+'/'+form.name, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllMobile(): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/mobile`).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllProductsBoutique(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/boutique/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllProductsByUser(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/admin/user/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getProductGenre(genre): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${genre}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getProductCategories(category): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${category}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getProductCategoryAndGenre(category, type): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/sort/${category}/${type}`).pipe(
      catchError(this.errorHandler)
    );
  }

 getProductQuantity(quantity,id): Observable<any> {
    return  this.http.get(`${API.PRODUITS}/add/quantity/${id}`, {params: quantity}).pipe(
      catchError(this.errorHandler)
    );
 }

 countProduitByLocation(location, produitName): Observable<any> {
    return this.http.get(`${API.PRODUITS}/quantity/byLocation/${location}`, {params: produitName}).pipe(
      catchError(this.errorHandler)
    );
  }

  removeProduitQuantity(quantity, id): Observable<any> {
       return this.http.get(`${API.PRODUITS}/remove/quantity/${id}`, {params: quantity}).pipe(
        catchError(this.errorHandler)
      );
  }

  getProductType(type): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${type}`).pipe(
      catchError(this.errorHandler)
    );
  }

  saveOrder(order: ProductOrders): Observable<any>  {
    console.log('je suis dans le service ' + order);
    return this.http.post(`${API.COMMANDES}`, order).pipe(
      catchError(this.errorHandler)
    );
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
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  set Total(value: number) {
    this.total = value;
    this.totalSubject.next();
  }


  saveProduct(form): Observable<any>  {
    console.log(form);
    return this.http.post(`${API.PRODUITS}/admin`, form, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

  saveUpdate(form, id): Observable<any>  {
    return this.http.post(`${API.PRODUITS}/admin/update/quantity/${id}`, form, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }
  updateUpdate(form, id): Observable<any>  {
    return this.http.put(`${API.PRODUITS}/admin/update/quantity/${id}`, form, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

  getUpdateByProduct(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/admin/find/update/${id}`,{headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteUpdate(id): Observable<any> {
    return this.http.delete(`${API.PRODUITS}/admin/delete/updateProduit/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  getProduct(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getProductFree(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  updatePicture(imageForm, id): Observable<any> {
    return this.http.post(`${API.PRODUITS}/admin/upload/${id}`, imageForm, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }
  updatePictures(imageForm, id): Observable<any> {
    return this.http.post(`${API.PRODUITS}/admin/uploads/${id}`, imageForm, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

  updateProduct(currentProduct, id): Observable<any> {
    console.log(currentProduct);
    return this.http.put(`${API.PRODUITS}/admin/${id}`, currentProduct, {headers: this.formHeaders}).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(`${API.PRODUITS}/admin/${id}`, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }
}
