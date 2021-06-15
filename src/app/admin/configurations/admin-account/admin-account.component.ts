import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss'],
  providers: [MessageService]
})
export class AdminAccountComponent implements OnInit {
  users: any = {};
  userForm: FormGroup;
  currentUser;
  accountID;
  currentEmail
  p = 1;
  searchItem : string;
  constructor(
    private route: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log(this.authService.currentUserValue);
    console.log(this.authService.currentUser);
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
      res => {
        this.users = res;
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
      location: this.userForm.get('location').value,
      phone: this.userForm.get('phone').value,
      username: this.userForm.get('username').value,
      fullName: this.userForm.get('fullName').value,
      birth_date: this.userForm.get('birth_date').value,
      secteur_activite: this.userForm.get('secteur_activite').value,
    };
    this.accountService.updateAccount(AccountData).subscribe(
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


  lock(contentLock, event){
    this.modalService.open(contentLock, {size: "lg"});
    this.currentEmail = event.id;
  }

  lockAccount(){
    this.accountService.activateAccount(this.currentEmail).subscribe(
      data => {
        console.log(this.currentEmail);
        this.messageService.add({severity: 'success', summary: 'Account is succeffuly locked', detail: 'record delete'});
        this.loadata();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }
  /** débloquer un compte **/

  getUnlock(contentUnLock, event) {

    this.modalService.open(contentUnLock, {size: "lg"});
    this.currentEmail = event.id;
  }

  unlock(){
    this.accountService.deactivateAccount(this.currentEmail).subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Account is succeffuly unlocked', detail: 'record delete'});
        this.loadata();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }


  showDetail(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    this.accountID = event.id
    this.currentUser = event;
    console.log(this.accountID);

  }

  onLocationSearch() {
    this.accountService.findAccountByLocation(this.userForm.value).subscribe(
      data => {
        this.users = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }


  showDemandeurSearch(contentLocationSearch){
    this.modalService.open(contentLocationSearch, {size: "md"});
  }

  searchEntrepreneur() {
    this.accountService.findAllAccountByRole(Role.ENTERPRENER).subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchClient() {
    this.accountService.findAllAccountByRole(Role.CLIENT).subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchCoaching() {
    this.accountService.findAllAccountByRole(Role.TRAINNER).subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchLoans() {
    this.accountService.findAllAccountByRole(Role.LOANS).subscribe(
      data => {
        this.users = data;
        console.log(data);
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



}
