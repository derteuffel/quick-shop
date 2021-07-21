import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from '../../eco/product/products/products.component';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private collapsed = true;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  provinces: string [];
  communes: string [];

  types: string[];

  

  constructor(private router: Router) { }

  ngOnInit(): void {
    
}


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getProduitPage(){
    this.router.navigateByUrl('ecommerce/produits');
  }

  getClientPage(){
    this.router.navigateByUrl('');
  }

  getCoachingPage(){
    this.router.navigateByUrl('ecommerce/services');
  }

  getInvestPage(){
    this.router.navigateByUrl('ecommerce/invests');
  }

  getLoansPage(){
    this.router.navigateByUrl('ecommerce/finances');
  }

  

}
