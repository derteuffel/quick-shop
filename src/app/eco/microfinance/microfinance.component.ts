import { Component, OnInit } from '@angular/core';
import {Coaching} from "../../models/coaching";
import {CoachingService} from "../../services/coaching.service";
import {Microfinance} from "../../models/microfinance";
import {MicrofinanceService} from "../../services/microfinance.service";
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-microfinance',
  templateUrl: './microfinance.component.html',
  styleUrls: ['./microfinance.component.scss']
})
export class MicrofinanceComponent implements OnInit {

  lists: any = {};
  p = 1;

  constructor(private loansService: LoansService) { }

  ngOnInit(): void {
    this.loadMicroFinancements();
  }

  loadMicroFinancements() {
    this.loansService.getAllbyVisitor().subscribe(
      (res: any) => {
        this.lists = res;
      },
      error => {
        console.log(error);
      }
    )
  }

}
