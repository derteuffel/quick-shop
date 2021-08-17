import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  user: any = {};
  p:number = 1;
  searchItem: string ='';

  constructor(private userService: AccountService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserDetails(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getUserDetails(id){
    this.userService.getOne(id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
