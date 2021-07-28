import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-loans-inputs-details',
  templateUrl: './loans-inputs-details.component.html',
  styleUrls: ['./loans-inputs-details.component.scss']
})
export class LoansInputsDetailsComponent implements OnInit {


  currentLoans: any = {};

  constructor(private microFinancementService: MicrofinanceService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLoans(this.activatedRoute.snapshot.paramMap.get('id'));
  }


  getLoans(id){
    this.microFinancementService.getFinance(id).subscribe(

      data => {
        this.currentLoans = data;
        console.log(data);
      }
    );
  }

}
