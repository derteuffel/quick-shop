import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import { EcommerceService } from '../../../services/ecommerce.service';

@Component({
  selector: 'app-seller-boutique-detail',
  templateUrl: './seller-boutique-detail.component.html',
  styleUrls: ['./seller-boutique-detail.component.css']
})
export class SellerBoutiqueDetailComponent implements OnInit {

  lists: any;
  p: number = 1;
  searchItem: string;
  form: any = {};

  currentBoutique: Boutique;
  constructor(private ecommerceService: EcommerceService, private activatedRoute: ActivatedRoute, 
    private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {

    this.loadList();
    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
  }



  loadList(): void{
    this.ecommerceService.getAllProductsAdmin().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProduct(id){

    this.ecommerceService.deleteProduct(id).subscribe(
      data => {
        console.log('Item deleted');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  getBoutique(id){
    this.boutiqueService.getBoutique(id).subscribe(

      data => {
        this.currentBoutique = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onSubmit(){
    this.boutiqueService.activateBoutique(this.currentBoutique.id, this.form.code).subscribe(
      data => {
        console.log(this.form.code);
        console.log('you activated your item successfully');
      },
      error => {
        console.log(error);
      }
    );
  }

}
