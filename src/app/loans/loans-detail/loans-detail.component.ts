import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Microfinance } from 'src/app/models/microfinance';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-loans-detail',
  templateUrl: './loans-detail.component.html',
  styleUrls: ['./loans-detail.component.scss']
})
export class LoansDetailComponent implements OnInit {

  message: string;
  loading = true;
  public submitted = false;
  p = 1;
  searchItem: string;
  form: any = {};
  private bodyText: string;
  lists: any = {};
  //details
  public details: boolean = false;
  currentLoans: Microfinance;
 
  imgURL: any;


  constructor(private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private loansService: MicrofinanceService,
              private router: Router,
              private messageService: MessageService) { }



  ngOnInit(): void {
    this.getLoans(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadList();

  }


  /** lister les articles d'une boutique **/
  loadList(): void{
  }



  getLoans(id){
    this.loansService.getFinance(id).subscribe(
      data => {
        this.currentLoans = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }






  onSubmit(){
    
  }

  openModalAddProduct() {
    
  }



  onDelete(contentDelete, event) {
    
  }

  deleteProduct() {
    

  }

  i

  openModalProduct(contentAdd){
    this.modalService.open(contentAdd, {size: 'lg'});
  }


  onBack(){
    this.router.navigateByUrl('admin/boutiques');
  }

  // fonction d'ajout du produit
  onSubmitProduct() {

    
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
}
