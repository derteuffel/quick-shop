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
  abonForm: FormGroup;
  abonnements: any = [];
  abonnement: Abonnement;
  abonnementId;
  types2: string[];

  message: string;
  loading = true;
  public submitted = false;
  categories: any = {};
  types: string[];

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
  productForm: FormGroup;
  public imagePath;
  imgURL: any;
  user: User;


  constructor(private ecommerceService: EcommerceService,
              private abonnementService: AbonnementService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              ) { }



  ngOnInit(): void {

    this.loadAbonnement();
    this.initForm2();
    this.types2 = [
      'PRODUCTS_SELLING',
      'COACHING_AND_SUPERVISION_SERVICE',
      'MICRO_FINANCEMENT'
    ];

    console.log(this.authService.currentUserValue.role);
    this.categories = Object.keys(Category);
    this.types = ['TUBERCULES', 'LEGUMES', 'EPICES','BOIS','CEREALES','DERIVE DE CEREALE','FRUIT ALIMENTAIRE','FRUIT, LEGUME ET CEREALE AOP','HUILE ESSENTIELLES',
  'PLANTES A FIBRES','CUIR'];
    console.log(this.types);
    this.measures = ['Kilogramme','Litre', 'Paire', 'Piece','Sac','Prestation']
    this.loadList();
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bunjumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi','Muha','Mukaza','Ntahangwa','Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
  'Mutimbuzi','Nyabiraba','Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda','Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha',
'Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira','Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro','Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo',
'Bugabira','Busoni',' Bwambarangwe',' Gitobe','Kirundo','Ntega','Vumbi','Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo',
'Bukeye','Kiganda','Mbuye',' Muramvya','Rutegama','Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro',
'Bisoro','Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka','Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo',
'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
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


  initForm2(){

    this.abonForm = new FormGroup({
      id: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      enabled: new FormControl(''),
      type: new FormControl(''),
    })

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

  deleteProduct() {
    this.ecommerceService.deleteProduct(this.productID).subscribe(
      (res: any) => {
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
      type: new FormControl(''),
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
      this.productForm.get('pictureUrl').setValue(file);
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
    formData.append('file',this.productForm.get('pictureUrl').value);
    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('type', this.productForm.get('type').value);
    formData.append('localisation', this.productForm.get('province').value+', '+this.productForm.get('commune').value);
    formData.append('quantity', this.productForm.get('quantity').value);
    formData.append('devise', this.productForm.get('devise').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('measure', this.productForm.get('measure').value);
    console.log(formData);
    this.ecommerceService.saveProduct(formData).subscribe(
      data => {
        this.productForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'article submitted', sticky: true});
        this.loadList();
        console.log(this.productForm);
        console.log(data);
        window.location.reload();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
      }
    );
  }

  // mise à jour d'un Produit

  setProduct(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    this.product = event.name;
    this.productID = event.id;
    console.log(event);
    console.log(event.id);
    this.productForm.patchValue({
      name: event.name,
      quantity: event.quantity,
      type: event.type,
      category: event.category,
      price: event.price,
      //localisation: event.localisation,
      description: event.description,
      measure: event.measure,


    });

  }

  updateProduct() {
    const ProductData = {
      id: this.productForm.get('id').value,
      name: this.productForm.get('name').value,
      quantity: this.productForm.get('quantity').value,
      type: this.productForm.get('type').value,
      category: this.productForm.get('category').value,
      price: this.productForm.get('price').value,
      //localisation: this.productForm.get('localisation').value,
      description: this.productForm.get('description').value,
      measure: this.productForm.get('measure').value,
      //pictureUrl: this.productForm.get('pictureUrl').value,
     // pictures: this.productForm.get('pictures').value,
    };
    this.ecommerceService.updateProduct(ProductData, this.productID).subscribe(
      (data: any) => {
        console.log(this.productID);
        this.productForm.reset();
        this.messageService.add({severity: 'success', summary: 'Record is updated successully', detail: 'record updated'});
        this.loadList();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
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


  openModalAddAbon(contentAddAbon){
    this.modalService.open(contentAddAbon, { size: 'lg' });
  }

  loadAbonnement() {
    this.abonnementService.getAll().subscribe(
      data => {
        this.abonnements = data;
      }, error => {
        console.log(error);
      }
    );
  }
  /** ajouter un abonnement **/
  saveAbonnement() {

    this.abonnementService.saveAbon(this.abonForm?.value).subscribe(
      (data: any) => {

        this.abonForm.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'votre abonnement a été  soumit', sticky: true});
        this.loadAbonnement();
      }, error => {
        this.abonForm.reset();
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }

  // suppression d'un abonnement

  deleteAbon(contentDelete1, event) {
    this.modalService.open(contentDelete1, {size: 'lg'});
    this.abonnementId = event.id;
  }

  onDeleteAbon() {
    this.abonnementService.deleteOne(this.abonnementId).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Account is deleted successully', detail: 'record delete'});
        this.loadAbonnement();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }


}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
