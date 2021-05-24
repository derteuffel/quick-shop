import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CoachingService } from 'src/app/services/coaching.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';

@Component({
  selector: 'app-details-coaching',
  templateUrl: './details-coaching.component.html',
  styleUrls: ['./details-coaching.component.scss']
})
export class DetailsCoachingComponent implements OnInit {

  public coaching:any = {
    title:'titre',
    description: 'Description',
    phone: 'phone',
    region: 'region',
    phone1: 'phone1',
    email: 'email',
    amount: 10000.0,
    sessions: []
  }

  public addCoachingSessionFurmGroup?: FormGroup;

  constructor(private coachingService: CoachingService,
    private sessionCoachingService: SessionCoachingService,
    private fb: FormBuilder,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private modalService: NgbModal,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForms();
    this.loadDatas();
  }

  private initForms(){
    this.addCoachingSessionFurmGroup = new FormGroup({
      label: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      coachingId: new FormControl('')
    })
  }

  private loadDatas(){

  }

  openAddCoachingSession(addSession:any, currentCoaching:any){

  }

  back(){
    this.router.navigate(['/admin/coachings']);
  }

}
