import { Component, OnInit } from '@angular/core';
import {CommandeService} from "../../services/commande.service";
import {EcommerceService} from "../../services/ecommerce.service";
import {CoachingService} from "../../services/coaching.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  res: any;
  provinceForm: FormGroup;
  nameForm: FormGroup;

     dataFilter: any = {
       location,
        name,
     }

  provinces: string [];
  constructor(
      private commandeService: CommandeService,
      private ecommerceService: EcommerceService,
      private coachingService: CoachingService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }




  init() {
    this.provinceForm = new FormGroup({
      region: new FormControl(''),
    });



  }

  showProvinceSearch(contentProvinceSearch){
    this.modalService.open(contentProvinceSearch, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
     this.init();
  }



  showProvinceSearch2(contentProvinceSearch2){
    this.modalService.open(contentProvinceSearch2, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.init();
  }

  showCommandProductSearch(contentCommandProductSearch2){
    this.modalService.open(contentCommandProductSearch2, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.init();
  }


  showCommandCoachingSearch2(contentCommandCoachingSearch2){
    this.modalService.open(contentCommandCoachingSearch2, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.init();
  }

  onProvinceSearch() {
    this.ecommerceService.findAllQuantityOfProductAvailable(this.dataFilter.location,this.dataFilter.name).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }



  onRegionSearch() {
    this.coachingService.findAllQuantityOfCoahingAvailable(this.dataFilter.name,this.dataFilter.location).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  getQuantityCommandCoachingByRegion() {
    this.commandeService.getQuantityCommandCoachingByRegion(this.dataFilter.location).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  getQuantityCommandProductByRegion(){
    this.commandeService.getQuantityCommandProductByRegion(this.dataFilter.location).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

}
