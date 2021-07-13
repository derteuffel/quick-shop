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
  coachings: any = {};
  navigationParams: any = {};
  p=1;

  constructor(private coachingService: CoachingService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.navigationParams = JSON.parse(params['values']);
    })
    console.log(this.navigationParams);
    if(this.isEmpty(this.navigationParams)){
      console.log('je suis la')
      this.loadCoachings();
    }else{
      console.log('je suis plutot la');
      this.loadSearchedCoaching(this.navigationParams);
    }
  }

  loadCoachings() {
    this.coachingService.getAllCoaching().subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      (error) => console.log(error)
    )
  }



  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  loadSearchedCoaching(form){
    this.coachingService.getAllCoachingSearch(form).subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
