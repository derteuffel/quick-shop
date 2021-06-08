import { Component, Input, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import { EcommerceService } from '../../../services/ecommerce.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../models/product.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/category";
import {Type} from "../../../models/type";
import {MessageService} from "primeng/api";



@Component({
  selector: 'app-boutique-detail',
  templateUrl: './boutique-detail.component.html',
  styleUrls: ['./boutique-detail.component.css'],
  providers: [MessageService],
})
export class BoutiqueDetailComponent implements OnInit {
  message: string;
  loading = true;
  public submitted = false;
  categories: any = {};
  types: any = {};
  p = 1;
  searchItem: string;
  form: any = {};
  private bodyText: string;
  currentBoutique: Boutique;
  products: Product[];

  productID;
  currentProduct: Product;
  product: Product;
  measures: string[];
  //details
  public details: boolean = false;
  provinces: string[];
  communes: string[];

  productForm: FormGroup;
  public imagePath;
  imgURL: any;


  constructor(private ecommerceService: EcommerceService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private router: Router,
              private messageService: MessageService,
              private boutiqueService: BoutiqueService) { }



  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.measures = ['Kilogramme','Litre', 'Paire', 'Piece','Sac','Prestation']
    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
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

  }


  /** lister les articles d'une boutique **/
  loadList(): void{

    this.ecommerceService.getAllProductsBoutique(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (res: any) => {

        this.products = res;
        console.log(res);
        console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error1 => {
        console.log(error1);
      }
    );
  }



  getBoutique(id){
    this.boutiqueService.getBoutique(id).subscribe(

      data => {
        this.currentBoutique = data;
        console.log(data);
      }, error1 => {
        console.log(error1);
      }
    );
  }






  onSubmit(){
    this.boutiqueService.activateBoutique(this.currentBoutique.id, this.form.code).subscribe(
      data => {
        console.log(this.form.code);
        console.log('you activated your item successfully');
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
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    const formData = new FormData();
    formData.append('file',this.productForm.get('pictureUrl').value);
    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('type', this.productForm.get('type').value);
    formData.append('localisation', this.productForm.get('province').value+', '+this.productForm.get('commune').value);
    formData.append('quantity', this.productForm.get('quantity').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('measure', this.productForm.get('measure').value);
    console.log(formData);
    let idProduct = this.activatedRoute.snapshot.paramMap.get('id');
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
    console.log(event.id);
    this.productForm.patchValue({
      name: event.name,
      quantity: event.quantity,
      type: event.type,
      category: event.category,
      price: event.price,
      location: event.location,
      description: event.description,
      measure: event.measure,


    });

  }

  updateProduct() {
    const ProductData = {
      name: this.productForm.get('name').value,
      quantity: this.productForm.get('quantity').value,
      type: this.productForm.get('type').value,
      category: this.productForm.get('category').value,
      price: this.productForm.get('price').value,
      location: this.productForm.get('location').value,
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


}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
