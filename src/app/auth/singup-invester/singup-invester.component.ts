import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {AuthLoginInfo} from "../requests/login-info";
import {Router} from "@angular/router";
import {Role} from "../../models/role";
import { SignUpInfo } from '../requests/signup-info';
import { CustomerInfo } from '../requests/customer-info';
import { MicrofinanceService } from 'src/app/services/microfinance.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-singup-invester',
  templateUrl: './singup-invester.component.html',
  styleUrls: ['./singup-invester.component.scss'],
  providers: [MessageService],
})
export class SingupInvesterComponent implements OnInit {

  form: any = {};
  signupInfo: CustomerInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  isChecked= false;
  errorMessage = '';
  provinces: string[];
  communes: string[];
  activites: string[];
  constructor(private financeService: MicrofinanceService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
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

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new CustomerInfo(
      this.form.fullName,
      this.form.email,
      '',
      '',
      this.form.phone,
      this.form.devise,
      this.form.idNumber,
      this.form.amount,
      this.form.method,
      this.form.duration,
      '');
    this.financeService.saveFinance(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        if(this.signupInfo.paymentMethod === 'VB'){
          this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});
        }else if(this.signupInfo.paymentMethod === 'MM'){
          this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});
        }else{
          this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});
        }
        this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});

      },
      error => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
        this.isSignUpFailed = true;
      }
    );
  }

  accept(){
    if(this.isChecked === false){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }

  }

  reloadPage() {
    this.router.navigateByUrl('/ecommerce/home');
  }


  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }


}
