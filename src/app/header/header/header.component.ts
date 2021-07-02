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
  produitForm: FormGroup;
  serviceForm: FormGroup;
  financeForm: FormGroup;

  types: string[];

  isEntreprener: boolean;
  isClient: boolean;
  isFinance: boolean;
  isTrainer: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.isFinance);
    console.log(this.isTrainer);
    console.log(this.isClient);
    console.log(this.isEntreprener);
}


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getProduitPage(){
    this.isEntreprener = true;
    this.isClient = false;
    this.isTrainer = false;
    this.isFinance = false;
    this.router.navigateByUrl('ecommerce/produits');
  }

  getClientPage(){
    this.isEntreprener = false;
    this.isClient = true;
    this.isTrainer = false;
    this.isFinance = false;
    this.router.navigateByUrl('');
  }

  getCoachingPage(){
    this.isEntreprener = false;
    this.isClient = false;
    this.isTrainer = true;
    this.isFinance = false;
    this.router.navigateByUrl('ecommerce/services');
  }

  getFinancePage(){
    this.isEntreprener = false;
    this.isClient = false;
    this.isTrainer = false;
    this.isFinance = true;
    this.router.navigateByUrl('ecommerce/finances');
  }

  

}
