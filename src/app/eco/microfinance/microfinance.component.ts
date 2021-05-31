import { Component, OnInit } from '@angular/core';
import {Coaching} from "../../models/coaching";
import {CoachingService} from "../../services/coaching.service";
import {Microfinance} from "../../models/microfinance";
import {MicrofinanceService} from "../../services/microfinance.service";

@Component({
  selector: 'app-microfinance',
  templateUrl: './microfinance.component.html',
  styleUrls: ['./microfinance.component.scss']
})
export class MicrofinanceComponent implements OnInit {

  microfinances: Microfinance[];

  constructor(private microFinanceService: MicrofinanceService) { }

  ngOnInit(): void {
    this.loadMicroFinancements();
  }

  loadMicroFinancements() {
    this.microFinanceService.getAllFinance().subscribe(
      (res: any) => {
        this.microfinances = res;
      }
    )
  }

}
