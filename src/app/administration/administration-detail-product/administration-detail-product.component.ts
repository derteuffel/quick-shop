import { Component, OnInit } from '@angular/core';
import {EcommerceService} from '../../ecommerce/services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-administration-detail-product',
  templateUrl: './administration-detail-product.component.html',
  styleUrls: ['./administration-detail-product.component.css']
})
export class AdministrationDetailProductComponent implements OnInit {

  currentProduct: any;

  imageForm: FormGroup;

  constructor(private productService: EcommerceService, private activatedRoute: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.imageForm = this.formBuilder.group({
      picture: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.get('picture').setValue(file);
    }
  }

  onSubmit(){
    const  formData = new FormData();
    formData.append('file', this.imageForm.get('picture').value);
    this.productService.updatePicture(formData, this.currentProduct.id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  getProduct(id){
    this.productService.getProduct(id).subscribe(
      data => {
        this.currentProduct = data;
        console.log(data);
      },
        error => {
        console.log(error);
      }
    );
  }

  deleteProduct(id){

    this.productService.deleteProduct(id).subscribe(
      data => {
        console.log('Item deleted');
        this.router.navigateByUrl('/administration');
      },
      error => {
        console.log(error);
      }
    );
  }

}
