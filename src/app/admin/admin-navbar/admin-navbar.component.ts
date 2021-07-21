import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs/index";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {map, switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  public focus;
  roles: string[];
  isConnected: boolean;
  user: User;
  constructor(
             private authService: AuthService, private router: Router,
             private accountService: AccountService,
             private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
    }else{
      this.isConnected = false;
    }
  }

  logout() {
    this.authService.logOut()/* .subscribe(
      data => {
        console.log('switch off');
        this.router.navigateByUrl('connexion');
      },
      error => {
        console.log(error);
      }
    ); */
    this.router.navigateByUrl('connexion');

  }

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  getOne() {
    this.accountService.getOne(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data =>{
        this.router.navigateByUrl('profile');
      }
    )
  }

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.accountService.getOne(userId))
  )

}
