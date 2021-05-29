import { Component, OnInit } from '@angular/core';
import {CoachingService} from "../../services/coaching.service";
import {Coaching} from "../../models/coaching";

@Component({
  selector: 'app-coachings',
  templateUrl: './coachings.component.html',
  styleUrls: ['./coachings.component.scss']
})
export class CoachingsComponent implements OnInit {
  coachings: Coaching[];

  constructor(private coachingService: CoachingService) { }

  ngOnInit(): void {
    this.loadCoachings();
  }

  loadCoachings() {
    this.coachingService.getAllCoaching().subscribe(
      (res: any) => {
        this.coachings = res;
      }
    )
  }

}
