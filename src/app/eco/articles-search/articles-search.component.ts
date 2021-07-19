import { Component, OnInit } from '@angular/core';
import {ProductOrder} from "../../models/product-order.model";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs/index";
import {ProductOrders} from "../../models/product-orders.model";
import {EcommerceService} from "../../services/ecommerce.service";
import {CoachingService} from "../../services/coaching.service";
import {Coaching} from "../../models/coaching";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-articles-search',
  templateUrl: './articles-search.component.html',
  styleUrls: ['./articles-search.component.scss']
})
export class ArticlesSearchComponent implements OnInit {

  products: Product[] = [];
  sub: Subscription;
  productSelected: boolean = false;

  navigationParams: any = {};
  produitForm: FormGroup;

  provinces: string[];
  communes: string[];
  types: any ={};
  p: number=1;
  names: string [];

  constructor(
    private ecommerceService: EcommerceService,
    private activatedRoute: ActivatedRoute, private localisation: Location) { }

  ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe(params => {
      this.navigationParams = JSON.parse(params['values']);
    })

    this.types = ['Produit agricole','Energie','Secteur Agroalimentaire','Betails','Peches','Telephone portable','Bags','Services de reparation','Charpenterie',
  'Salon de beaute','Couture','Services culturel et social','Performance musicales', 'Danse','Video production','Performance theatrales', 'Peintures','Photographie','Achats des pieces de rechanges'];
    // this.navigationParams = this.localisation.getState();
    console.log(this.navigationParams);
    this.loadSearchedProduit(this.navigationParams );

    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];

this.init();
  }

  namesSelector(){
    switch(this.produitForm.get('category').value){
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
    }
  
  }


selector(){
  console.log('je suis la')
  switch(this.produitForm.get('province').value){
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

  init(){
    this.produitForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      category: new FormControl(''),
      name: new FormControl('')
    });
  }

 isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

onProduitSearch(){
  const searchValue = {
    province: this.produitForm.get('province').value,
    commune: this.produitForm.get('commune').value,
    name: this.produitForm.get('name').value,
    category:  this.produitForm.get('category').value
  }
  console.log(searchValue);
  this.loadSearchedProduit(searchValue);
  this.init();
}

  /* addToCart(order: ProductOrder) {
    this.ecommerceService.SelectedProductOrder = order;
    this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
    this.productSelected = true;
    console.log(this.selectedProductOrder);
    console.log("i selected item");
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.ecommerceService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.ecommerceService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  } */




  loadSearchedProduit(form){
    this.ecommerceService.getAllProductsSearch(form).subscribe(
      data => {
        this.products = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
