import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoansService } from 'src/app/services/loans.service';
import { MicrofinanceService } from 'src/app/services/microfinance.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';

@Component({
  selector: 'app-loans-request',
  templateUrl: './loans-request.component.html',
  styleUrls: ['./loans-request.component.scss'],
  providers: [MessageService]
})
export class LoansRequestComponent implements OnInit {

  lists: any = {};
  boutiqueRef
  sessionRef;
  message1: string;
  message2 : string;
  p: number = 1;
  searchItem: string;
  supportProject: File = null;
  validatedSupport: File = null;
  isValid1: boolean = false;
  isValid2: boolean = false;
  isValid: boolean = false;
  categories: string[];
  names:  string[];
  provinces: string[];
  communes: string[];
  public submitted: boolean = false;
  public loansFormGroup?: FormGroup;
  public loansUpdateFormGroup?: FormGroup;
  public loans;
  uploadedFile: File = null;

  constructor(              //private coachingService: CoachingService,
                            private sessionService: SessionCoachingService,
                            private loansService: LoansService,
                            private fb: FormBuilder,
                            private router: Router,
                            private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
  this.categories = ['Produit agricole','Energie','Secteur Agroalimentaire','Betails','Peches','Telephone portable','Bags','Services de reparation','Charpenterie',
  'Salon de beaute','Couture','Services culturel et social','Performance musicales', 'Danse','Video production','Performance theatrales', 'Peintures','Photographie','Achats des pieces de rechanges','Education'];
    this.initForm();
    this.loadData();
  }

  selector(){
    console.log('je suis la')
    switch(this.loansFormGroup.get('province').value){
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

  namesSelector(){
    switch(this.loansFormGroup.get('sector').value){
      case 'Produit agricole':{
        this.names = ['Ble','Riz','Haricots','Bananes','Chou','Manioc','Mais','Ananas','Pasteque','Oignons','Pommes de terre'];
        break;
      }
      case 'Energie':{
        this.names = ['Installation des systemes d\'electricite','Paiement des factures d\'electricite','Conter un electricien','Acheter un generateur','Acheter du Gaz','Recharge gaz','Acheter du charbon'];
        break;
      }
      case 'Secteur Agroalimentaire':{
        this.names =['Farine de manioc','Farine de mais','Farine de ble','Huile Vegetale (Palm)','Huile Vegetale (Cacahuetes)','Huile Vegetale (Coton)','Huile Vegetale (Avocat)','Jus','Lait','Yaourt','Pate de tomate','Confiture','Miel','Huile de palm'];
        break;
      }

      case 'Betails':{
        this.names = ['Porc', 'Chevre','Lapins','Vaches','Poulets'];
        break;
      }

      case 'Peches':{
        this.names = ['Capitain','Tilapia','Sangala','Mukeke','Ndagala','Kuhe','Ndagala fume'];
        break;
      }
      case 'Telephone portable':{
        this.names = ['Telephone portable', 'Smart phone'];
        break;
      }

      case 'Bags':{
        this.names = ['Sacs de classe','Sacs a main','Valises','Sacs de sports'];
        break;
      }
      case 'Services de reparation':{
        this.names = ['Reparation telephone','Reparation bicyclette','Reparation Motocyclette','Reparation Bateaux','Auto ecole Camion','Auto ecole Voiture','Auto ecole Motocyclette',];
        break;
      }

      case 'Charpenterie':{
        this.names = ['Chaise de salon','Chaise de salle a mange','Table d\'etude','Table de salon','Table salle a mange','Bureau pour Enseignant','Placard a vetement','Armoire de salon','Etagere a livres'];
        break;
      }

      case 'Salon de beaute':{
        this.names = ['Lavage Cheuveux','Tresses','Raser les Cheuveux','Raser barbe','Maquillage','Pedicure','Manucure'];
        break;
      }
      case 'Couture':{
        this.names = ['Tissus costume (Achat)','Kitenges (Achat)','Imvutano (Achat)','Tissus costume (Couture)','Kitenges (Couture)','Pantalon (Couture)','Jupe (Couture)','Chemise (Couture)','Culotte (Couture)'];
        break;
      }
      case 'Services culturel et social' :{
        this.names = ['Plannification d\'evenement','Decoration evenementiel','Maitre de ceremonie','Traducteur'];
        break;
      }

      case 'Performance musicales' :{
        this.names = ['Tambourinaire','Groupe acoustique','Groupe d\'interprete','Chorale','Deejay','Guitariste','Violon','Pianiste','Quatuor','Orchestre','Solo','Autre'];
        break;
      }

      case 'Danse':{
        this.names = ['Groupe de danse traditionnel','Groupe de danse moderne', 'Autres'];
        break;
      }
      case 'Video production':{
        this.names = ['Publicites','Documentaires','Evennementielle','Vlog', 'Autres'];
        break;
      }
      case 'Performance theatrales':{
        this.names = ['Pieces','Sketches','Publicites','Commedies musicales','Paroles','Narrateur et conteur', 'Autres'];
        break;
      }

      case 'Peintures':{
        this.names = ['Paysages','Portrait','Abstraite', 'Autres'];
        break;
      }
      case 'Photographie':{
        this.names = ['Photodocumentaire','Phototheque','Couverture evenementielle','Portrait','Photo passeport', 'Autres'];
        break;
      }

      case 'Achats des pieces de rechanges':{
        this.names = ['Motocyle', 'Vehicules', 'Camions'];
        break;
      }
      case 'Education':{
        this.names = ['Cours du soir'];
        break;
      }
    }

  }

  initForm() {
    this.loansFormGroup = new FormGroup({
      id: new FormControl(''),
      province: new FormControl(''),
      commune: new FormControl(''),
      amount:  new FormControl(''),
      sector:  new FormControl(''),
      keysPartners:  new FormControl(''),
      keysActivities: new FormControl(''),
      keysRessources: new FormControl(''),
      valuesPropositions: new FormControl(''),
      customerRelationship: new FormControl(''),
      channels: new FormControl(''),
      costStructure: new FormControl(''),
      revenueStream: new FormControl(''),
      object: new FormControl(''),
      name: new FormControl(''),
      devise: new FormControl('')
    });

    
  }

  /* onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(!this.validateFile(file.name)){
        console.log('contains bad files1');
        this.message1 = 'Error the file should be in PDF, WORD or EXCEL file, please load correct format file';
        this.isValid = false;
      }else{
        console.log('contains good files1');
      this.loansFormGroup.get('projectSupport').setValue(file);
      this.isValid1 = true;
      if(this.isValid2){
        this.isValid = true;
      }
      }
    }
  }
  onFilesSelect2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(!this.validateFile(file.name)){
        console.log('contains bad files2');
        this.message2 = 'Error the file should be in PDF, WORD or EXCEL file, please load correct format file';
        this.isValid = false;
      }else{
        console.log('contains good files2');
      this.loansFormGroup.get('validatedSupport').setValue(file);
      this.isValid2 = true;
      if(this.isValid1){
        this.isValid = true;
      }
      }
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf'||ext.toLowerCase() == 'docx'||ext.toLowerCase() == 'xlsx'||ext.toLowerCase() == 'xls') {
        return true;
    }
    else {
        return false;
    }
} */

  loadData() {
    this.loansService.getAllbyUser().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  saveLoans() {
    this.submitted = true;
    if (this.loansFormGroup?.invalid) return;  
    console.log(this.loansFormGroup.value);  
      
      this.loansService.save(this.loansFormGroup.value).subscribe(
        (data: any) => {
          // this.router.navigateByUrl('/admin/boutiques');
          this.loansFormGroup.reset();
          this.messageService.add({severity:'success', summary:'Success', detail:'Votre demande a ete pris en compte vous serrez notifier dans les jours avenir', sticky: true});
          this.loadData();
        }, error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
        }
      );
    

    this.submitted = false;
  }


  setCoaching(contentUpdate, event) {

    this.modalService.open(contentUpdate, {size: "lg"});
    this.loans = event;

    this.loansFormGroup.patchValue({
      id: event.id,
      province: event.province,
      commune: event.commune,
      amount:  event.amount,
      sector:  event.sector,
      name: event.name,
      object:  event.object,
      projectSupport: event.projectSupport,
      validatedSupport: event.validatedSupport,
      devise: event.devise,
      keysPartners:  event.keysPartners,
      keysActivities: event.keysActivities,
      keysRessources: event.keysRessources,
      valuesPropositions: event.valuesPropositions,
      customerRelationship: event.customerRelationship,
      channels: event.channels,
      costStructure: event.costStructure,
      revenueStream: event.revenueStream,
    });
  }

  getLoans(contentDetails, event) {

    this.modalService.open(contentDetails, {size: "lg"});
    this.loans = event;
  }

  updateCoaching(id) {
    this.loansService.update(this.loansFormGroup.value, id).subscribe(
      (data: any) => {
        console.log(data);
        this.loansUpdateFormGroup.reset();
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }


  showDetail(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  onDelete() {
    this.loansService.delete(this.boutiqueRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
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
