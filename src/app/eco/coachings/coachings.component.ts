import { Component, OnInit } from '@angular/core';
import {CoachingService} from "../../services/coaching.service";
import {Coaching} from "../../models/coaching";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coachings',
  templateUrl: './coachings.component.html',
  styleUrls: ['./coachings.component.scss']
})
export class CoachingsComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
    
  }

}
