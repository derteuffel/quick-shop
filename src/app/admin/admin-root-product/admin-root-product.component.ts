import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";
import { Product } from 'src/app/models/product.model';
import { UpdateProduit } from 'src/app/models/update-product.model';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-admin-root-product',
  templateUrl: './admin-root-product.component.html',
  styleUrls: ['./admin-root-product.component.scss'],
  providers: [MessageService],
})
export class AdminRootProductComponent implements OnInit {
  currentProduct: Product;
  lists: any = {};
  p = 1;
  searchItem: string;
  message: string;
  orders: any = {};
  order: any = {};
  isUpdate: boolean;
  isOrder: boolean;
  loading = true;
  public submitted = false;
  isClient: boolean;
  submittedCode: string;
  bsModalRef: BsModalRef;
  updateID;
  update: UpdateProduit;
  updateForm: FormGroup;


  constructor(private productService: EcommerceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUserValue.role);
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.showOrders();
    this.isOrder = true;
    if(this.authService.currentUserValue.role == Role.CLIENT){
      this.isClient = true;
    }
  }




  onSubmit(data){

    this.submitted = true;
    console.log(data);

    this.productService.saveUpdate(data, this.currentProduct.id).subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Update done', sticky: true});
        this.loadList();
        console.log(data);
        window.location.reload();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
      }
    );
  }




  getProduct(id){
    this.productService.getProduct(id).subscribe(
      data => {
        this.currentProduct = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /** lister les articles d'une boutique **/
  loadList(): void{

    this.productService.getUpdateByProduct(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {

        this.lists = data;
        console.log(data);
        //console.log(this.currentProduct.id);
      },
      error1 => {
        console.log(error1);
      }
    );
  }


   /** lister les articles d'une boutique **/
   loadListOrder(): void{

    this.productService.getOrderByProduct(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {

        this.orders = data;
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  showUpdates(){
    this.isUpdate = true;
    this.isOrder = false;
    this.loadList();
  }

  showOrders(){
    this.isUpdate = false;
    this.isOrder = true;
    this.loadListOrder();
  }

  openModalProduct(contentAdd: any) {
    this.modalService.open(contentAdd, {size: 'md'});
  }

  onDelete(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'md'});
    this.updateID = event.id;
  }

  getContent(contentOrder, event) {
    this.modalService.open(contentOrder, {size: 'md'});
    this.order = event;
  }

  deleteUpdate() {
    this.productService.deleteUpdate(this.updateID).subscribe(
      (res: any) => {
        this.loadList();
      }
    );

  }






  /** toast message function primeng  **/
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  onBack(){
    this.router.navigateByUrl('admin/home');
  }

  closeDialogForm() {
    this.update = null;
  }
}
