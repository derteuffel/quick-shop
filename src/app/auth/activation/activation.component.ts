import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  code: string;
  navigationParams: any = {};
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.activation(this.activatedRoute.snapshot.paramMap.get('code'));
    
  }

  activation(activation){
    this.authService.activate(activation).subscribe(
      data => {
          console.log(activation);
          this.router.navigateByUrl('connexion');
      },
      error => {
        console.log(error);
      }
    );
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

}
