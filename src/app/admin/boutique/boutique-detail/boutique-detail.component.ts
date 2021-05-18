import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { error } from 'protractor';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import { EcommerceService } from '../../../services/ecommerce.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../models/product.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {initialState} from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';
import {AddProductComponent} from '../../product/add-product/add-product.component';


@Component({
  selector: 'app-boutique-detail',
  templateUrl: './boutique-detail.component.html',
  styleUrls: ['./boutique-detail.component.css']
})
export class BoutiqueDetailComponent implements OnInit {
  lists: any = [];
  p = 1;
  searchItem: string;
  form: any = {};
  submittedCode: string;
  private bodyText: string;
  currentBoutique: Boutique;
  products: Product[];
  bsModalRef: BsModalRef;


  constructor(private ecommerceService: EcommerceService,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private router: Router,
              private boutiqueService: BoutiqueService) { }



  ngOnInit(): void {

    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadList();

  }


  /** lister les articles d'une boutique **/
  loadList(): void{

    this.ecommerceService.getAllProductsBoutique(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (res: any) => {
        console.log(res);
        this.lists = res;

        console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  deleteProduct(id){

    this.ecommerceService.deleteProduct(id).subscribe(
      data => {
        console.log('Item deleted');
        window.location.reload();
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  getBoutique(id){
    this.boutiqueService.getBoutique(id).subscribe(

      data => {
        this.currentBoutique = data;
        console.log(data);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  onSubmit(){
    this.boutiqueService.activateBoutique(this.currentBoutique.id, this.form.code).subscribe(
      data => {
        console.log(this.form.code);
        console.log('you activated your item successfully');
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  openModalAddProduct(contentAdd: any) {
    this.modalService.open(contentAdd, {size: 'lg'});
  }


  onCreate(p: Product) {
    this.router.navigateByUrl('admin/product/add/' + p.id);
  }

  openModalWithComponent() {

    this.bsModalRef = this.modalService2.show(AddProductComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(res => {
      this.lists.push(res.data);
    });
  }

}
