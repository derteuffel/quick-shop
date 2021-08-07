import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductOrder} from '../models/product-order.model';
import {ProductOrders} from '../models/product-orders.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {API} from "../../environments/environment";


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

  getAllProducts(): Observable<any>  {
    return this.http.get(`${API.PRODUITS}/all`);
  }

  getAllProductsSearch(form): Observable<any>  {
    console.log(form);
    return this.http.post(`${API.PRODUITS}/all`, form);
  }
  getAllProductsSearchLike(form): Observable<any>  {
    console.log(form);
    return this.http.post(`${API.PRODUITS}/all/search`, form);
  }
  getAllProductsSearchByProvince(province,form): Observable<any>  {
    console.log(form);
    console.log(province);
    
    return this.http.post(`${API.PRODUITS}/all/province/${province}`, form);
  }

  getAllProductsSearchBylocation(province,form): Observable<any>  {
    console.log(form);
    console.log(province);
    
    return this.http.post(`${API.PRODUITS}/all/search/${province}`, form);
  }

  getOrderByProduct(id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/produits/${id}`, {headers: this.headers});
  }
  getCoachingOrders(id): Observable<any> {
    return this.http.get(`${API.COMMANDES}/admin/coachings/${id}`, {headers: this.headers});
  }

  getAllProductsAdmin(): Observable<any>  {
    return this.http.get(`${API.PRODUITS}/admin`,  {headers: this.headers});
  }

  findAllQuantityOfProductAvailable(form): Observable<any> {
    return this.http.get(API.PRODUITS+'/admin/quantity/dispo/'+form.region+'/'+form.category+'/'+form.name, {headers: this.headers});
  }

  getAllMobile(): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/mobile`);
  }

  getAllProductsBoutique(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/boutique/${id}`, {headers: this.headers});
  }

  getAllProductsByUser(): Observable<any> {
    return this.http.get(`${API.PRODUITS}/admin/user`, {headers: this.headers});
  }

  getProductGenre(genre): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${genre}`);
  }

  getProductCategories(category): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${category}`);
  }

  getProductCategoryAndGenre(category, type): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/sort/${category}/${type}`);
  }

 getProductQuantity(quantity,id): Observable<any> {
    return  this.http.get(`${API.PRODUITS}/add/quantity/${id}`, {params: quantity});
 }

 countProduitByLocation(location, produitName): Observable<any> {
    return this.http.get(`${API.PRODUITS}/quantity/byLocation/${location}`, {params: produitName});
  }

  removeProduitQuantity(quantity, id): Observable<any> {
       return this.http.get(`${API.PRODUITS}/remove/quantity/${id}`, {params: quantity});
  }

  getProductType(type): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${type}`);
  }

  saveOrder(order: ProductOrders): Observable<any>  {
    console.log('je suis dans le service ' + order);
    return this.http.post(`${API.COMMANDES}`, order);
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
    return this.http.post(`${API.PRODUITS}/admin`, form, {headers: this.formHeaders});
  }

  saveUpdate(form, id): Observable<any>  {
    return this.http.post(`${API.PRODUITS}/admin/update/quantity/${id}`, form, {headers: this.headers});
  }
  updateUpdate(form, id): Observable<any>  {
    return this.http.put(`${API.PRODUITS}/admin/update/quantity/${id}`, form, {headers: this.formHeaders});
  }

  getUpdateByProduct(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/admin/find/update/${id}`,{headers: this.headers});
  }

  deleteUpdate(id): Observable<any> {
    return this.http.delete(`${API.PRODUITS}/admin/delete/updateProduit/${id}`, {headers: this.headers});
  }

  getProduct(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${id}`);
  }

  getProductFree(id): Observable<any> {
    return this.http.get(`${API.PRODUITS}/all/${id}`);
  }

  updatePicture(imageForm, id): Observable<any> {
    return this.http.post(`${API.PRODUITS}/admin/upload/${id}`, imageForm, {headers: this.formHeaders});
  }
  updatePictures(imageForm, id): Observable<any> {
    return this.http.post(`${API.PRODUITS}/admin/uploads/${id}`, imageForm, {headers: this.formHeaders});
  }

  updateProduct(currentProduct, id): Observable<any> {
    console.log(currentProduct);
    return this.http.put(`${API.PRODUITS}/admin/${id}`, currentProduct, {headers: this.formHeaders});
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(`${API.PRODUITS}/admin/${id}`, {headers: this.headers});
  }
}
