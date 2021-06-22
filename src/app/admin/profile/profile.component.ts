import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {Observable} from "rxjs/index";
import {map, switchMap} from "rxjs/internal/operators";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,) { }



  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  ngOnInit(): void {
  }

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.accountService.getOne(userId))
  )


}
