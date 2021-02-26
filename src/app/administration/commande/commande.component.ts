import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../ecommerce/services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

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
