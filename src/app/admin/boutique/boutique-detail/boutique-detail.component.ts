import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import { EcommerceService } from '../../../services/ecommerce.service';

@Component({
  selector: 'app-boutique-detail',
  templateUrl: './boutique-detail.component.html',
  styleUrls: ['./boutique-detail.component.css']
})
export class BoutiqueDetailComponent implements OnInit {

  lists: any;
  p: number = 1;
  searchItem: string;
  form: any ={};
  submittedCode: string;

  currentBoutique: Boutique;
  constructor(private ecommerceService: EcommerceService, private activatedRoute: ActivatedRoute, 
    private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {
    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadList();
  }



  loadList(): void{
    this.ecommerceService.getAllProductsBoutique(this.currentBoutique.id).subscribe(
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
