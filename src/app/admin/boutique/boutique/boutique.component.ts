import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../../../services/boutique.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Boutique} from '../../../models/boutique';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  providers: [MessageService],
})
export class BoutiqueComponent implements OnInit {

  lists: any = {};
  p = 1;
  searchItem: string;
  boutique: Boutique;
  loading = true;
  boutiqueRef;
  public submitted = false;
  public boutiqueFormGroup?: FormGroup;
  public currentBoutique;

  constructor(private boutiqueService: BoutiqueService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadAll();
    this.primengConfig.ripple = true;
    this.initForm();
  }

  initForm() {
    this.boutiqueFormGroup = new FormGroup({
      id: new FormControl(''),
      localisation: new FormControl(''),
      name: new FormControl(''),
      phone: new FormControl(''),
      region: new FormControl(''),
      cardNumber: new FormControl(''),
      status: new FormControl(''),
      activationCode: new FormControl(''),
    });
  }


  loadAll(){
    this.boutiqueService.getAllBoutiques().subscribe(
      data => {
        console.log(data);
        this.lists = data;
        console.log(this.lists);
      }, error => {
        console.log(error);
      }
    );
  }

  onSaveBoutique() {
    this.submitted = true;
    if (this.boutiqueFormGroup?.invalid) { return; }
    this.boutiqueService.saveBoutique(this.boutiqueFormGroup?.value).subscribe(
      (data: any) => {
        this.boutiqueFormGroup.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'boutique submitted', sticky: true});
        this.loadAll();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }


  // mise à jour d'une Boutique

  setBoutique(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    this.currentBoutique = event.name;
    this.boutiqueRef = event.id;
    console.log(event.id);
    this.boutiqueFormGroup.patchValue({
      id: event.id,
      name: event.name,
      localisation: event.localisation,
      phone: event.phone,
      region: event.region,
      cardNumber: event.cardNumber,
      status: event.status,
      activationCode: event.activationCode


    });

  }

  updateBoutique() {
    const CompanyData = {
      id: this.boutiqueFormGroup.get('id').value,
      name: this.boutiqueFormGroup.get('name').value,
      localisation: this.boutiqueFormGroup.get('localisation').value,
      phone: this.boutiqueFormGroup.get('phone').value,
      region: this.boutiqueFormGroup.get('region').value,
      cardNumber: this.boutiqueFormGroup.get('cardNumber').value,
      status: this.boutiqueFormGroup.get('status').value,
      activationCode: this.boutiqueFormGroup.get('activationCode').value,
    };
    this.boutiqueService.updateBoutique(CompanyData, this.boutiqueRef).subscribe(
      (data: any) => {
        console.log(this.boutiqueRef);
        this.boutiqueFormGroup.reset();
        this.messageService.add({severity: 'success', summary: 'Record is updated successully', detail: 'record updated'});
        this.loadAll();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }


  showDetail(contentDetail, event){
    console.log(event);
    this.modalService.open(contentDetail, {size: 'lg'});
    this.boutiqueRef = event.id;
    console.log(this.boutiqueRef);

  }

  // detail d'une boutique
  getBoutique(){
    this.boutiqueService.getBoutique(this.boutiqueRef).subscribe(

      data => {
        this.currentBoutique = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  // suppression d'une Boutique

  deleteBoutique(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.boutiqueRef = event.id;
  }

  onDelete() {
    this.boutiqueService.deleteBoutique(this.boutiqueRef).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Boutique is deleted successully', detail: 'record delete'});
        this.loadAll();
      }
    );
  }

  // Action d'activation ou desactivation d'une Boutique

  actionBoutique(contentAction, event) {
    this.modalService.open(contentAction, {size: 'lg'});
    this.boutiqueRef = event.id;
  }

  onAction() {
    this.boutiqueService.activationAdmin(this.boutiqueRef).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Boutique has change status successully', detail: 'Boutique Status changed'});
        this.loadAll();
      }
      );
  }

  
  sendCode(id){
    this.boutiqueService.sendCode(id).subscribe(
      data => {
        console.log('code has been to a seller');
        window.location.reload();
      },
      error => {
        console.log(error);
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

  openModalAddCompany(contentAdd) {
    this.modalService.open(contentAdd, { size: 'lg' });

  }
}
