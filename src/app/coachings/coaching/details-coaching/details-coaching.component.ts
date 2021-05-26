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

  currentCoacing: Coaching;
  public submitted = false;
  sessions: SessionCoaching[];
  sessionID;
  currentSession: SessionCoaching;
  sessionForm: FormGroup;

  p = 1;

  public searchItem:any = {

  };

  constructor(private coachingService: CoachingService,
              private fb: FormBuilder,
              private sessionService: SessionCoachingService,
              private modalService: NgbModal,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDatas();
    this.loadSession();
  }

  private loadDatas(){
    this.coachingService.getCoachingById(this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe(data=>{
      this.currentCoacing = data;
      console.log(data);
    }, error => {

    });
  }
  /** lister les sessions d'un coaching **/
  loadSession(){
    this.sessionService.getSessionCoaching(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (res: any) => {
        this.sessions = res;
      }, error1 => {
        console.log(error1);
      }
    );

  }

  initForm() {
    this.sessionForm = new FormGroup({
      id: new FormControl(''),
      label: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
  }

  openModalSession(contentAdd){
    this.modalService.open(contentAdd, {size: 'lg'});
  }

  addNewSession(){
    this.submitted = true;
    if(this.sessionForm?.invalid) return;
    this.sessionService.saveSessionCoaching(this.sessionForm.value).subscribe(
      data =>{
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'article submitted', sticky: true});
        this.loadSession();
        this.sessionForm.reset();

      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
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
