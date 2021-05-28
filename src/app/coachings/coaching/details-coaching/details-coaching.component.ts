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
  sessions: SessionCoaching[];
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
    this.loadList();
    this.getSession(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
  }

  onBack(){
    this.router.navigateByUrl('admin/coachings');
  }

  /** Lister les sessions d'un coaching **/

  loadList(): void{
    this.sessionService.getAllSessionCoaching().subscribe(
      (res: any) => {
        this.sessions = res.body;
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
    this.sessionService.saveSessionCoaching(this.sessionForm?.value).subscribe(
      data => {
        this.sessionForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'session submitted', sticky: true});
        this.loadList();
        window.location.reload();
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
