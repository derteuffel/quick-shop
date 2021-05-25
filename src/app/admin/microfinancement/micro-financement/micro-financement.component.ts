import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {MicrofinanceService} from '../../../services/microfinance.service';

@Component({
  selector: 'app-micro-financement',
  templateUrl: './micro-financement.component.html',
  styleUrls: ['./micro-financement.component.scss']
})
export class MicroFinancementComponent implements OnInit {

  p = 1;
  searchItem: string;
  lists:Array<any>;
  message:any;

  constructor(private microfinanceService:MicrofinanceService,
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
  
  loadAll(){
    
  }

  initForm(){
    
  }

  openModalAddCompany(contentAdd){

  }

  onReject(){

  }

  onConfirm(){

  }

}
