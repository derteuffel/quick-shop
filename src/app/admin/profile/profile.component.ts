import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {Observable} from "rxjs/index";
import {map, switchMap} from "rxjs/internal/operators";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from 'src/app/auth/auth.service';

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
  activites:any={};
  communes: any = {};
  currentAccount:User;
  accountID;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private messageService: MessageService) { }

  /* Properties for the profile form */

  updateProfileForm: FormGroup;

  id: FormControl;
  email: FormControl;
  username: FormControl;
  phone: FormControl;
  birthdate: FormControl;
  fullName: FormControl;
  password: FormControl;
  role: FormControl;
  secteurActivite: FormControl;
  idNumber: FormControl;
  interest: FormControl;
  location: FormControl;

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  ngOnInit(): void {
    this.initForm();
    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
    }else{
      this.isConnected = false;
    }

    this.activites = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
      this.getAccount(this.user.id);
  }

  selector(){
    console.log('je suis la')
    switch(this.updateProfileForm.get('province').value){
        case 'Bubanza':{
            this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi'];
            break;
        }
        case 'Bujumbura Mairie':{
            this.communes = ['Muha','Mukaza','Ntahangwa'];
            break;
        }
        case 'Bujumbura':{
            this.communes = ['Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
                    'Mutimbuzi','Nyabiraba'];
            break
        }

        case 'Bururi': {
            this.communes = ['Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda'];
            break;
        }
        case 'Cankuzo': {
            this.communes = ['Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha'];
            break;
        }

        case 'Cibitoke':{
            this.communes =['Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira'];
            break;
        }
        case 'Gitega':{
            this.communes =['Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
                    'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro'];
            break;
        }
        case 'Karuzi':{
            this.communes = ['Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo'];
            break;
        }
        case 'Kayanza':{
            this.communes = ['Butaganzwa','Gahombo',' Gatara',' Kabarore','kayanza','Matongo','Muhanga','Muruta','Rango'];
            break;
        }
        case 'Kirundo':{
            this.communes = ['Bugabira','Busoni','Bwambarangwe', 'Gitobe','Kirundo', 'Ntega','Vumbi'];
            break;
        }

        case 'Makamba':{
            this.communes = ['Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo'];
            break;
        }
        case 'Muramvya':{
            this.communes =['Bukeye','Kiganda','Mbuye','Muramvya','Rutegama'];
            break;
        }

        case 'Muyinga':{
            this.communes = ['Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro'];
            break;
        }
        case 'Mwaro':{
            this.communes = ['Bisoro', 'Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka'];
            break;
        }
        case 'Ngozi':{
            this.communes =['Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo','Tangara'];
            break;
        }
        case 'Rumonge':{
            this.communes =['Bugarama','Burambi','Buyengero','Muhuta','Rumonge'];
            break;
        }
        case 'Rutana':{
            this.communes = ['Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana'];
            break;
        }
        case 'Ruyigi':{
            this.communes =['Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
        }
    }
  }

  



  onSubmit() {
    const microData = {
      //id: this.updateProfileForm.get('id').value,
      email: this.updateProfileForm.get('email').value,
      username: this.updateProfileForm.get('username').value,
      phone: this.updateProfileForm.get('phone').value,
      fullName: this.updateProfileForm.get('fullName').value,
      secteurActivite: this.updateProfileForm.get('secteurActivite').value,
      location: this.updateProfileForm.get('province').value+', '+this.updateProfileForm.get('commune').value,
      birthDate: this.updateProfileForm.get('birthDate').value,
      idNumber: this.updateProfileForm.get('idNumber').value
    };
    console.log(microData);

    this.accountService.updateAccount(microData).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary: 'Profile a été mis à jour', detail:'profile updated'});
        this.logout();
        //window.location.reload();

      },error1 => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }

  setAccount(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: "lg"});
    this.currentAccount = event.username;
    this.accountID = event.id
    this.updateProfileForm.patchValue({
      id: event.id,
      email: event.email,
      username: event.username,
      phone: event.phone,
      idNumber: event.idNumber,
      fullName: event.fullName,
      secteurActivite: event.secteurActivite,
      location: event.location,
      birthDate: event.birthDate
    })
  }

  initForm(){

    this.updateProfileForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      phone: new FormControl(''),
      fullName: new FormControl(''),
      secteurActivite: new FormControl(''),
      province: new FormControl(''),
      commune: new FormControl(''),
      birthDate: new FormControl(''),
      idNumber: new FormControl('')
    })

  }
  getAccount(id){
    this.accountService.getOne(id).subscribe(
      data => {
        this.currentAccount = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
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

  logout(){
    this.authService.logOut();
        this.router.navigateByUrl('connexion');
      
  }

}
