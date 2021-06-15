import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachingService } from 'src/app/services/coaching.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";
import { Coaching } from 'src/app/models/coaching';
import { SessionCoaching } from 'src/app/models/session-coaching';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';
import { EcommerceService } from 'src/app/services/ecommerce.service';


@Component({
  selector: 'app-admin-root-coaching',
  templateUrl: './admin-root-coaching.component.html',
  styleUrls: ['./admin-root-coaching.component.scss'],
  providers: [MessageService],
})
export class AdminRootCoachingComponent implements OnInit {
  message: string;
  loading = true;
  public submitted = false;
  p = 1;
  searchItem: string;
  currentCoaching: Coaching;
  sessions: any = {};
  isSession: boolean;
  isOrder: boolean;
  orders: any ={};
  order: any = {};
  sessionRef;
  currentSession: SessionCoaching;
  session: SessionCoaching;
  sessionForm: FormGroup;

  constructor(private coachingService: CoachingService,
              private fb: FormBuilder,
              private sessionService: SessionCoachingService,
              private modalService: NgbModal,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderService: EcommerceService) { }

  ngOnInit(): void {
    this.showSessions();
    this.getSession(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
  }

  /** Lister les sessions d'un coaching **/

  loadList(): void{
    this.sessionService.getSessionCoaching(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.sessions = res;
        console.log(res);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  loadListOrder(): void{
    this.orderService.getCoachingOrders(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.orders = res;
        console.log(res);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  showOrders(){
    this.isOrder = true;
    this.isSession = false;
    this.loadListOrder()
  }

  showSessions(){
    this.isOrder = false;
    this.isSession = true;
    this.loadList();
  }
  getSession(id){
    this.coachingService.getCoachingById(id).subscribe(
      data => {
        this.currentCoaching = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  // mise à jour d'une Session

  setSession(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    console.log(event.id);
    this.sessionForm.patchValue({
      id: event.id,
      label: event.label,
      startDate: event.startDate,
      endDate: event.endDate,
      status: event.status

    });

  }

  updateSession() {
    const sessionData = {
      id: this.sessionForm.get('id').value,
      label: this.sessionForm.get('label').value,
      startDate: this.sessionForm.get('startDate').value,
      endDate: this.sessionForm.get('endDate').value,
      status: this.sessionForm.get('status').value,
    };
    this.sessionService.updateSessionCoaching(sessionData).subscribe(
      (data: any) => {
        console.log(data);
        this.sessionForm.reset();
        this.messageService.add({severity: 'success', summary: 'Record is updated successully', detail: 'record updated'});
        this.loadList();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }

  onAction(contentAction, event){
    this.modalService.open(contentAction, {size: 'lg'});
    this.sessionRef = event.id;
  }


  actionSession() {
    this.sessionService.actionSession(this.sessionRef).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Record is activated successully', detail: 'record delete'});
        this.loadList();
      }
    );
  }

  // suppression d'une Boutique

  deleteSession(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.sessionRef = event.id;
  }

  onDelete() {
    this.sessionService.deleteSessionCoaching(this.sessionRef).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Record is deleted successully', detail: 'record delete'});
        this.loadList();
      }
    );
  }

  onBack(){
    this.router.navigateByUrl('admin/coachings');
  }


  openModalSession(contentAdd){
    this.modalService.open(contentAdd, {size: 'lg'});
  }

  getOrder(contentOrder, event){
    this.modalService.open(contentOrder, {size: 'lg'});
    this.order = event;
  }

initForm() {
    this.sessionForm = new FormGroup({
      id: new FormControl(''),
      label: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    })
}

  // fonction d'ajout d'une session

  onSubmitSession() {
    this.submitted = true;
    if(this.sessionForm?.invalid){return;}
    this.sessionService.createSession(this.sessionForm?.value, this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.sessionForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'article submitted', sticky: true});
        this.loadList();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
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
