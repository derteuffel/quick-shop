import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Boutique } from '../ecommerce/models/boutique';
import { BoutiqueService } from '../ecommerce/services/boutique.service';
import { EcommerceService } from '../ecommerce/services/ecommerce.service';

@Component({
  selector: 'app-boutique-detail',
  templateUrl: './boutique-detail.component.html',
  styleUrls: ['./boutique-detail.component.css']
})
export class BoutiqueDetailComponent implements OnInit {

  lists: any;
  p: number = 1;
  searchItem: string;
  code: string;

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
    this.boutiqueService.activateBoutique(this.currentBoutique.id, this.code).subscribe(
      data => {
        console.log(this.code);
        console.log('you activated your item successfully');
      },
      error => {
        console.log(error);
      }
    );
  }

}
