import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EcommerceService} from "../../../services/ecommerce.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateProduit} from "../../../models/update-product.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [MessageService],
})
export class ArticleComponent implements OnInit {
  currentProduct: any;
  lists: any = {};
  p = 1;
  searchItem: string;
  message: string;
  loading = true;
  public submitted = false;
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
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadList();
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
        console.log(data);
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

  openModalProduct(contentAdd: any) {
    this.modalService.open(contentAdd, {size: 'lg'});
  }

  onDelete(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.updateID = event.id;
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
    this.router.navigateByUrl('admin/detail/boutique/'+this.currentProduct.boutique.id);
  }

  closeDialogForm() {
    this.update = null;
  }
}
