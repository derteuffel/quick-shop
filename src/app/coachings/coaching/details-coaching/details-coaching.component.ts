import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachingService } from 'src/app/services/coaching.service';

@Component({
  selector: 'app-details-coaching',
  templateUrl: './details-coaching.component.html',
  styleUrls: ['./details-coaching.component.scss']
})
export class DetailsCoachingComponent implements OnInit {

  public currentCoacing:any = {
    title: 'Titre',
    description: 'description',
    email: 'Email',
    phone1: 'phone1',
    phone: 'phone',
    amount: 100000.0,
    logo: '',
    region: 'Mokolo'
  };

  p = 1;

  public searchItem:any = {

  };

  constructor(private coachingService: CoachingService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDatas();
  }

  private loadDatas(){
    this.coachingService.getCoachingById(this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe(data=>{
      this.currentCoacing = data;
      console.log(data);
    }, error => {

    });
  }

  addNewSession(){
    
  }

}
