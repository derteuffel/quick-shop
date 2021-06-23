import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {Observable} from "rxjs/index";
import {map, switchMap} from "rxjs/internal/operators";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {

  ProfileDetails: User;
  constructor(private router: Router,
              private fb: FormBuilder,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private messageService: MessageService) { }

  /* Properties for the profile form */

  updateProfileForm: FormGroup;

  id: FormControl;
  email: FormControl;
  username: FormControl;
  phone: FormControl;
  birthdate: FormControl;
  fullName: FormControl;
  password: FormControl;
  role: FormControl;
  secteurActivite: FormControl;
  idNumber: FormControl;
  interest: FormControl;
  location: FormControl;

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  ngOnInit(): void {
  }

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.accountService.getOne(userId))
  )



  onSubmit() {
    let userDetails = this.updateProfileForm.value;

    this.accountService.updateAccount(userDetails).subscribe(
      result=> {

        this.messageService.add({severity:'success', summary: 'Profile is updated successully', detail:'profile updated'});
      },error1 => {
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

  openModalAddCompany(contentAdd) {
    this.modalService.open(contentAdd, { size: 'lg' });

  }

}
