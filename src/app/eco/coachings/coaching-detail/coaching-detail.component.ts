import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoachingService} from "../../../services/coaching.service";
import {ProductOrder} from "../../../models/product-order.model";
import {Error} from "tslint/lib/error";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from "primeng/api";
import {CommandeService} from "../../../services/commande.service";
import {Product} from "../../../models/product.model";
import {EcommerceService} from "../../../services/ecommerce.service";
import {Temoignage} from "../../../models/temoignage";
import {TemoignageService} from "../../../services/temoignage.service";

@Component({
  selector: 'app-coaching-detail',
  templateUrl: './coaching-detail.component.html',
  styleUrls: ['./coaching-detail.component.scss'],
  providers: [MessageService],
})
export class CoachingDetailComponent implements OnInit {

  temoignageForm: FormGroup;
  form: any = {};
  temoignage: Temoignage;
  public submitted: boolean = false;

  currentCoaching: any;
  numbers: number[];
  productOrder: ProductOrder[] = [] ;
  subscribeForm: FormGroup;
  orderForm: FormGroup;
  products: Product[] = [];
  constructor(
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private fb: FormBuilder,
              private temoignageService: TemoignageService,
              private ecommerceService: EcommerceService,
              private commandeService: CommandeService,
              private messageService: MessageService,
              private modalService: NgbModal,
              private coachingService: CoachingService) { }

  ngOnInit(): void {
    this.getCoaching(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
    this. initForm2();
  }

  getCoaching(id): void{
    this.coachingService.getCoachingById(id).subscribe(
      data => {
        this.currentCoaching = data;
        console.log(data);
      },
      error => {
        console.log(Error);
      }
    );
  }

  openModalFormulaire(contentAdd)  {
   this.modalService.open(contentAdd, {size: 'lg'});
  }

  initForm(){
    this.subscribeForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      paymentMode: new FormControl('')
    });
  }

  
  onSaveSubscribe(){
    const formData =  {
      clientName: this.orderForm.get('name').value,
      email: this.orderForm.get('email').value,
      clientPhone: this.orderForm.get('phone').value,
      quantity: this.orderForm.get('quantity').value,
      paymentMode: this.orderForm.get('paymentMode').value,
      lieuDeLivraison: this.orderForm.get('lieuDeLivraison').value,
      isCoaching: true
    }
    this.commandeService.saveCmd(formData, this.currentCoaching.id).subscribe(
      data => {
        this.subscribeForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'commande submitted', sticky: true});
        this.getCoaching(this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
      }
    )
  }

  setNumberList(){
    for(let i = 0; i < 1000; i++){
      this.numbers.push(i);
    }
  }


  initForm2() {
    this.temoignageForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl(''),
      name: new FormControl(''),
    })
  }

  /** ajouter un temoignage **/

  saveTemoignage() {

    this.submitted = true;
    if(this.temoignageForm?.invalid){return;}

    this.temoignageService.createTemoignage(this.temoignageForm.value).subscribe(
      (data: any) => {
        this.temoignageForm.reset();
        this.router.navigate(["/ecommerce/home"]);
        this.messageService.add({severity:'success', summary:'Success', detail:'votre témoignage a été  soumit', sticky: true});

      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
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
