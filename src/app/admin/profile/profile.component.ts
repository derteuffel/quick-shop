import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {Observable} from "rxjs/index";
import {map, switchMap} from "rxjs/internal/operators";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {

  ProfileDetails: User;
  user: User;
  isConnected: boolean;
  provinces:any={};
  communes: any = {};
  constructor(private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private messageService: MessageService) { }

  /* Properties for the profile form */

  updateProfileForm: FormGroup;


  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  ngOnInit(): void {


    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
    }else{
      this.isConnected = false;
    }

    this.getOne(this.activatedRoute.snapshot.paramMap.get('id'));

    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi','Muha','Mukaza','Ntahangwa','Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
      'Mutimbuzi','Nyabiraba','Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda','Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha',
      'Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira','Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
      'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro','Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo',
      'Bugabira','Busoni',' Bwambarangwe',' Gitobe','Kirundo','Ntega','Vumbi','Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo',
      'Bukeye','Kiganda','Mbuye',' Muramvya','Rutegama','Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro',
      'Bisoro','Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka','Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo',
      'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
  }

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.accountService.getOne(userId))
  )


  initForm(){

    this.updateProfileForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      phone: new FormControl(''),
      fullName: new FormControl(''),
      secteurActivite: new FormControl(''),
      location: new FormControl(''),
      birthDate: new FormControl(''),
    })

  }

  getOne(id) {
    this.accountService.getOne(id).subscribe(
      data => {
        this.user = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  onSubmit() {
    let userDetails = this.updateProfileForm.value;

    this.accountService.updateAccount(userDetails, this.updateProfileForm.value.id).subscribe(
      result=> {

        this.messageService.add({severity:'success', summary: 'Profile is updated successully', detail:'profile updated'});
      },error1 => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }

  /** toast message function primeng  **/
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  openModalAddCompany(contentAdd) {
    this.modalService.open(contentAdd, { size: 'lg' });

  }

}
