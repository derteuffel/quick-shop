import { Component, OnInit } from '@angular/core';
import {Coaching} from "../../models/coaching";
import {CoachingService} from "../../services/coaching.service";
import {Microfinance} from "../../models/microfinance";
import {MicrofinanceService} from "../../services/microfinance.service";
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss']
})
export class InvestComponent implements OnInit {

  lists: any = {};
  p = 1;

  constructor(private loansService: LoansService) { }

  ngOnInit(): void {
    
  }

  

}
