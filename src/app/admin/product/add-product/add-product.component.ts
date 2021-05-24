import {Component,  EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../models/category';
import {Type} from '../../../models/type';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import {Product} from "../../../models/product.model";
import {MessageService} from "primeng/api";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [MessageService],
})
export class AddProductComponent implements OnInit {

  @Input() product: Product;
  @Output() saveProductEvent = new EventEmitter<Product>();
  @Output() closeDialogEvent = new EventEmitter();

  display: boolean;
  currentProduct: Product;
  types: string [];
  categories: string [];
  message: string;
  loading = true;
  productRef;
  public submitted = false;
  public productFormGroup?: FormGroup;
  form: any = {};
  selectedFiles: File[] = [];
  boutique: Boutique;
  public imagePath;
  imgURL: any;
 public userFile: any = File;

  constructor( private ecommerceService: EcommerceService,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private formBuilder: FormBuilder,
               private messageService: MessageService,
               private boutiqueService: BoutiqueService,
               public toastr: ToastrService) {


  }

  ngOnInit(): void {

    this.display = true;
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    //this.initForm();
    this.getBoutique();
    this.productFormGroup = this.formBuilder.group({
      name: [''],
      boutiqueId: [''],
      price: [''],
      category: [''],
      type: [''],
      quantity: [''],
      marque: [''],
      description: [''],
      pictures: [null]
    });
  }


  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      for(let i=0; i < event.target.files.length; i++){
        this.selectedFiles.push(<File>event.target.files[i]);
      }
      console.log(this.selectedFiles.toString)
    }
  }


 

  onSubmit(): void{
    this.ecommerceService.saveProduct(this.product, this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        if (data.success) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'article submitted', sticky: true});
          this.display = false;
          this.product.id = data.id;
          this.saveProductEvent.emit(this.product);
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
      }
    );
  }



  getBoutique(){

    this.boutiqueService.getBoutique(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.boutique = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  /** fonction pour l'upload de fichier **/
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      console.log(file)

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }


  closeFormDialog() {
    this.display = false;
    this.closeDialogEvent.emit();
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
