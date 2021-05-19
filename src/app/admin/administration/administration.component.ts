import { Component, OnInit } from '@angular/core';

import {EcommerceService} from '../../services/ecommerce.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.sass']
})
export class AdministrationComponent implements OnInit {

  lists: any;
  p = 1;
  searchItem: string;
  public submitted = false;
  loading = true;
  public productID;

  constructor(private modalService: NgbModal,
              private ecommerceService: EcommerceService) { }

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



  onDelete(contentDelete, event) {
    console.log(event);
    this.modalService.open(contentDelete, {size: 'lg'});
    this.productID = event.id;
    console.log(this.productID);
  }

  deleteProduct() {
    this.ecommerceService.deleteProduct(this.productID).subscribe(
      (res: any) => {
        this.loadList();
      }
    );

  }


}
