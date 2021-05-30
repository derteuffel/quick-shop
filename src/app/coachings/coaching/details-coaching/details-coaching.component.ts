import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachingService } from 'src/app/services/coaching.service';
import {SessionCoaching} from "../../../models/session-coaching";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";
import {SessionCoachingService} from "../../../services/session-coaching.service";
import {Coaching} from "../../../models/coaching";

@Component({
  selector: 'app-details-coaching',
  templateUrl: './details-coaching.component.html',
  styleUrls: ['./details-coaching.component.scss'],
  providers: [MessageService],
})
export class DetailsCoachingComponent implements OnInit {
  message: string;
  loading = true;
  public submitted = false;
  p = 1;
  searchItem: string;
  currentCoaching: Coaching;
  sessions: any = {};
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
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadList(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getSession(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
  }

  /** Lister les sessions d'un coaching **/

  loadList(id): void{
    this.sessionService.getSessionCoaching(id).subscribe(
      res => {
        this.sessions = res;
        console.log(res);
      },
      error1 => {
        console.log(error1);
      }
    );
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
        this.loadList(this.activatedRoute.snapshot.paramMap.get('id'));
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
        this.loadList(this.activatedRoute.snapshot.paramMap.get('id'));
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
        this.loadList(this.activatedRoute.snapshot.paramMap.get('id'));
      }
    );
  }

  onBack(){
    this.router.navigateByUrl('admin/coachings');
  }


  openModalSession(contentAdd){
    this.modalService.open(contentAdd, {size: 'lg'});
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
        this.loadList(this.activatedRoute.snapshot.paramMap.get('id'));
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
