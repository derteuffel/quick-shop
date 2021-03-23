import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-seller-boutique-list',
  templateUrl: './seller-boutique-list.component.html',
  styleUrls: ['./seller-boutique-list.component.css']
})
export class SellerBoutiqueListComponent implements OnInit {

  lists: any = {};
  p: number = 1;
  searchItem: string;
  constructor(private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {
    this.loadAll();
  }


  loadAll(){
    this.boutiqueService.getAllBoutiques().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

}
