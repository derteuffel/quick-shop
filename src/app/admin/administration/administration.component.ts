import { Component, OnInit } from '@angular/core';
import {any} from 'codelyzer/util/function';
import {EcommerceService} from '../../services/ecommerce.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.sass']
})
export class AdministrationComponent implements OnInit {

  lists: any;
  p: number = 1;
  searchItem: string;
  public submitted: boolean = false;
  loading: boolean = true;

  constructor(private ecommerceService: EcommerceService) { }

  ngOnInit(): void {
    this.loadList();
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

}
