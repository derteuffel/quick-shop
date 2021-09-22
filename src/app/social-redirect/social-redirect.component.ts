import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { Role } from '../models/role';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-social-redirect',
  templateUrl: './social-redirect.component.html',
  styleUrls: ['./social-redirect.component.scss']
})
export class SocialRedirectComponent implements OnInit {

  private data:any;

  private isOld:boolean = true;

  private isReloaded:boolean = false;



  constructor(private activatedRoute:ActivatedRoute,
    private modalService:NgbModal,
    private authService: AuthService,
    private router: Router,
    private accoutService: AccountService) { }

  ngOnInit(): void {
    if(localStorage.getItem("reload")==null || localStorage.getItem("reload")==undefined){
      localStorage.setItem("reload", "true");
      location.reload();
    }
    this.activatedRoute.queryParams.subscribe(
      params =>{
        this.data = params.data;
        if(this.data!=null && this.data!=undefined){
          localStorage.setItem("currentUser", this.data);
          localStorage.setItem('id', this.authService.currentUserValue.id + '');
          this.authService.currentUserSubject.next(JSON.parse(this.data));
          console.log(this.data);
        }
        if(params.isOld=='false'){
          this.isOld = false; 
                this.authService.currentUserValue.role;
        }else{
          switch(this.authService.currentUserValue.role){
            case Role.CLIENT:
              this.router.navigate(["/admin/commandes/users"]);
              break;
            case Role.ENTERPRENER:
              this.router.navigate(["/admin/home"]);
              break;
            case Role.TRAINNER:
              this.router.navigate(["/admin/coachings"]);
              break;
            case Role.LOANS:
              this.router.navigate(["/loans/requests"]);
              break;
            
            case Role.INVESTOR:
              this.router.navigate(["/loans/inputs"]);
              break;
            default: 
              this.router.navigate(["/admin/home"]);
          }
        }

      }
    );
  }

  showLinks(){
    return !this.isOld;
  }

  updateUser(role){
    console.log('######################" role = ' + role);
    
    this.accoutService.updateRole(this.authService.currentUserValue.id, role)
    .subscribe(data =>{
      
      let tmpDate:any = data;
      tmpDate.token = JSON.parse(this.data).token;

      localStorage.setItem("currentUser", JSON.stringify(tmpDate));
      localStorage.setItem('id', this.authService.currentUserValue.id + '');
      this.authService.currentUserSubject.next(JSON.parse(JSON.stringify(tmpDate)));
      
      switch(data.role){
        case Role.CLIENT:
          this.router.navigate(["/admin/commandes/users"]);
          break;
        case Role.ENTERPRENER:
          this.router.navigate(["/admin/home"]);
          break;
        case Role.TRAINNER:
          this.router.navigate(["/admin/coachings"]);
          break;
        case Role.LOANS:
          this.router.navigate(["/loans/requests"]);
          break;
        
        case Role.INVESTOR:
          this.router.navigate(["/loans/inputs"]);
          break;
        default: 
          this.router.navigate(["/admin/home"]);
      }
    }, error =>{
      this.router.navigate(["/connexion"]);
    });
  }

}
