import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {

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

  sendCode(id){
    this.boutiqueService.sendCode(id).subscribe(
      data => {
        console.log('code has been to a seller');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

}
