import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../../services/commande.service';

@Component({
  selector: 'app-seller-commande',
  templateUrl: './seller-commande.component.html',
  styleUrls: ['./seller-commande.component.css']
})
export class SellerCommandeComponent implements OnInit {

  p: number = 1;
  searchItem: string;
  lists: any = {};
  constructor(private commandeService: CommandeService ) { }

  ngOnInit(): void {
    this.loadall();
  }

  loadall(){
    this.commandeService.getAll().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
