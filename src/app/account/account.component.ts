import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [MessageService],
})
export class AccountComponent implements OnInit {

  users: any = [];
  userForm: FormGroup;
  currentUser;
  accountID;
  currentEmail
  p = 1;
  constructor(
              private route: Router,
              private accountService: AccountService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.loadata();
  }


  initForm() {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl(''),
      fullName: new FormControl(''),
      birth_date: new FormControl(''),
      location: new FormControl(''),
      secteur_activite: new FormControl(''),

    });
  }


  public loadata() {
    this.accountService.getAllAccount().subscribe(
      (res: any) => {
        this.users = res.data;
      }, error => {
        console.log(error);
      }
    )
  }

  setAccount(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: "lg"});
    this.accountID = event.id;
    this.currentUser = event.username;
    this.userForm.patchValue({
      id: event.id,
      email: event.email,
      username: event.username,
      phone: event.phone,
      fullName: event.fullName,
      birth_date: event.birth_date,
      location: event.location,
      secteur_activite: event.secteur_activite


    });
  }

  updateAccount(){
    const AccountData = {
      id: this.userForm.get('id').value,
      email: this.userForm.get('email').value,
      localisation: this.userForm.get('localisation').value,
      phone: this.userForm.get('phone').value,
      username: this.userForm.get('username').value,
      fullName: this.userForm.get('fullName').value,
      birth_date: this.userForm.get('birth_date').value,
      secteur_activite: this.userForm.get('secteur_activite').value,
    };
    this.accountService.updateAccount(AccountData, this.accountID).subscribe(
      (data: any) => {
        this.userForm.reset();
        this.messageService.add({severity: 'success', summary: 'Record is updated successully', detail: 'record updated'});
        this.loadata();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }



  // suppression d'un account

  deleteAccount(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.accountID = event.id;
  }

  onDelete() {
    this.accountService.deleteAccount(this.accountID).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Account is deleted successully', detail: 'record delete'});
        this.loadata();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }


  /** bloquer un compte **/

  getLock(content,event){
    this.modalService.open(content, {size: "lg"});
    this.currentEmail = event.email;
  }

  lockAccount(){
    this.accountService.lockAccount(this.currentEmail).subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Account is succeffuly locked', detail: 'record delete'});
         this.loadata();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }
  /** débloquer un compte **/
  unlock(){
    this.accountService.unlockAccount(this.currentEmail).subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Account is succeffuly unlocked', detail: 'record delete'});
        this.loadata();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    )
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
