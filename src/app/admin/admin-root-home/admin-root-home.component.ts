import { Component, Input, OnInit, Type, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';


import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import { Product } from 'src/app/models/product.model';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import {Abonnement} from "../../models/abonnement";
import {AbonnementService} from "../../services/abonnement.service";



@Component({
  selector: 'app-admin-root-home',
  templateUrl: './admin-root-home.component.html',
  styleUrls: ['./admin-root-home.component.css'],
  providers: [MessageService],
})
export class AdminRootHome implements OnInit {


  message: string;
  loading = true;
  public submitted = false;
  categories: any = {};
  names: string[];

  p = 1;
  searchItem: string;
  form: any = {};
  private bodyText: string;
  products: Product[];

  productID;
  currentProduct: Product;
  product: Product;
  measures: string[];
  //details
  public details: boolean = false;
  provinces: string[];
  communes: string[];

  isClient: boolean;
  isValid: boolean = false;
  productForm: FormGroup;
  updateForm: FormGroup;
  public imagePath;
  imgURL: any;
  user: User;
  uploadedFile: File = null;

  constructor(private ecommerceService: EcommerceService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              ) { }



  ngOnInit(): void {
    console.log(this.authService.currentUserValue.role);
  this.categories = ['Produit agricole','Energie','Secteur Agroalimentaire','Betails','Peches','Telephone portable','Bags','Services de reparation','Charpenterie',
  'Salon de beaute','Couture','Services culturel et social','Performance musicales', 'Danse','Video production','Performance theatrales', 'Peintures','Photographie','Achats des pieces de rechanges','Education'];
    this.measures = ['KG','L', 'Btl', 'Pc','Sac','Prest']
    this.loadList();
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];

    this.initForm();

    if (this.authService.currentUserValue.token) {
      this.user = this.authService.currentUserValue;
      switch(this.user.role){
        case Role.CLIENT: {
          this.isClient = true;
          break;
        }
        default:{
          break;
        }
      }
    }

  }

  namesSelector(){
    switch(this.productForm.get('category').value){
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


  selector(){
    console.log('je suis la')
    switch(this.productForm.get('province').value){
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

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


  /** lister les articles d'une boutique **/
  loadList(): void{

    this.ecommerceService.getAllProductsAdmin().subscribe(
      (res: any) => {

        this.products = res;
        console.log(res);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  openModalAddProduct(contentAdd: any) {
    this.modalService.open(contentAdd, {size: 'lg'});
  }



  onDelete(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.productID = event.id;
  }

  deleteProduct(id) {
    this.ecommerceService.deleteProduct(id).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Item deleted sucessfully', sticky: true});
        this.loadList();
      }
    );

  }

  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      quantity: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      province: new FormControl(''),
      devise: new FormControl(''),
      commune: new FormControl(''),
      measure: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      pictureUrl: new FormControl(null),
     // pictureUrl: new FormControl(''),
    });
  }

  openModalProduct(contentAdd){
    this.modalService.open(contentAdd, {size: 'lg'});
  }

  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.uploadedFile = file;
    
    }
  }

  onBack(){
    this.router.navigateByUrl('admin/boutiques');
  }

  // fonction d'ajout du produit
  onSubmitProduct() {

    this.submitted = true;
    if (this.productForm?.invalid) { return; }
    const formData = new FormData();

    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('province', this.productForm.get('province').value);
    formData.append('commune', this.productForm.get('commune').value);
    formData.append('quantity', this.productForm.get('quantity').value);
    formData.append('devise', this.productForm.get('devise').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('measure', this.productForm.get('measure').value);

      formData.append('file', this.uploadedFile);
      console.log(formData);
      console.log(this.isObjectCheck(this.uploadedFile));
      if(!this.isObjectCheck(this.uploadedFile)){
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Empty file, you have to attach file before save'});
      }else{
        if(!this.validateFile(this.uploadedFile.name)){
          this.message = 'File should be image, please load correct file';
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message});
        }else{
      this.ecommerceService.saveProduct(formData).subscribe(
        data => {
          this.productForm.reset();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'article submitted', sticky: true});
          this.loadList();
          window.location.reload();
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to save'});
          console.log(error);
        }
      );
    }
  }



  }

  validateFile(name: string) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png'||ext.toLowerCase() == 'jpg'||ext.toLowerCase() == 'jpeg') {
        return true;
    }
    else {
        return false;
    }
}

  // mise à jour d'un Produit

  setProduct(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    this.product = event.name;
    this.productID = event.id;
    this.productForm.patchValue({
      name: event.name,
      quantity: event.quantity,
      category: event.category,
      price: event.price,
      province: event.province,
      commune: event.commune,
      devise: event.devise,
      description: event.description,
      measure: event.measure,
      pictureUrl: event.pictureUrl
    });

  }

  updateProduct() {
    const formData = new FormData(); 
    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('province', this.productForm.get('province').value);
    formData.append('commune', this.productForm.get('commune').value);
    formData.append('quantity', this.productForm.get('quantity').value);
    formData.append('devise', this.productForm.get('devise').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('measure', this.productForm.get('measure').value);
    formData.append('file', this.uploadedFile);
      formData.append('pictureUrl', this.productForm.get('pictureUrl').value);
    if(this.isEmpty(this.uploadedFile)){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Empty file, you have to attach file before save'});
    }else{
      
    this.ecommerceService.updateProduct(formData, this.productID).subscribe(
      (data: any) => {
        console.log(this.productID);
        this.productForm.reset();
        this.messageService.add({severity: 'success', summary: 'record updated', detail: 'Record is updated successully'});
        this.loadList();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to update'});
      }
    );
    }
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


  openModalAddAbon(contentAddAbon){
    this.modalService.open(contentAddAbon, { size: 'lg' });
  }

  isObjectCheck(obj: any): boolean {
    for (var key in this) {
      if (this.hasOwnProperty(key)) return false;
    }
    return true;
  }




}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
