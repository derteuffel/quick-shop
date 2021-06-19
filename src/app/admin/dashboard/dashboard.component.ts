import { Component, OnInit } from '@angular/core';
import {CommandeService} from "../../services/commande.service";
import {EcommerceService} from "../../services/ecommerce.service";
import {CoachingService} from "../../services/coaching.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private commandeService: CommandeService,
      private ecommerceService: EcommerceService,
      private coachingService: CoachingService,
  ) { }

  ngOnInit(): void {
  }

}
