import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
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
  activites:any={};
  communes: any = {};
  currentAccount;
  accountID;
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
    this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi','Muha','Mukaza','Ntahangwa','Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
      'Mutimbuzi','Nyabiraba','Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda','Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha',
      'Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira','Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
      'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro','Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo',
      'Bugabira','Busoni',' Bwambarangwe',' Gitobe','Kirundo','Ntega','Vumbi','Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo',
      'Bukeye','Kiganda','Mbuye',' Muramvya','Rutegama','Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro',
      'Bisoro','Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka','Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo',
      'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
  }




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




  setAccount(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: "lg"});
    this.currentAccount = event.username;
    this.accountID = event.id
    this.updateProfileForm.patchValue({
      id: event.id,
      email: event.email,
      username: event.username,
      phone: event.phone,
      fullName: event.fullName,
      secteurActivite: event.secteurActivite,
      location: event.location,
      birthDate: event.birthDate
    })

  }

  onSubmit() {
    const microData = {
      id: this.updateProfileForm.get('id').value,
      email: this.updateProfileForm.get('email').value,
      username: this.updateProfileForm.get('username').value,
      phone: this.updateProfileForm.get('phone').value,
      fullName: this.updateProfileForm.get('fullName').value,
      secteurActivite: this.updateProfileForm.get('secteurActivite').value,
      location: this.updateProfileForm.get('location').value,
      birthDate: this.updateProfileForm.get('birthDate').value,
    };

    this.accountService.updateAccount(microData, this.accountID).subscribe(
      (data: any) => {

        this.messageService.add({severity:'success', summary: 'Profile a été mis à jour', detail:'profile updated'});
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



}
