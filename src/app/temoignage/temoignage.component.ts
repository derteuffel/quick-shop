import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TemoignageService} from "../services/temoignage.service";
import {Abonnement} from "../models/abonnement";
import {Temoignage} from "../models/temoignage";

@Component({
  selector: 'app-temoignage',
  templateUrl: './temoignage.component.html',
  styleUrls: ['./temoignage.component.scss'],
  providers: [MessageService],
})
export class TemoignageComponent implements OnInit {


  lists: any = [];
  types: string[];
  temoignageForm: FormGroup;
  form: any = {};
  temoignage: Temoignage;
  public submitted: boolean = false;

  constructor(

                            private temoignageService: TemoignageService,
                            private router: Router,
                            private fb: FormBuilder,
                            private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private modalService2: BsModalService,
                            private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
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
