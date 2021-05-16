import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTES} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  constructor(private router: Router,) { }

  ngOnInit(): void {

    this.listTitles = ROUTES.filter(listTitle => listTitle)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    console.log('deconnection');
    // window.location.reload();

  }

}
