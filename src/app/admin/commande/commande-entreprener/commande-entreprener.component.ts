import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../../services/commande.service';

@Component({
  selector: 'app-commande-entreprener',
  templateUrl: './commande-entreprener.component.html',
  styleUrls: ['./commande-entreprener.component.css']
})
export class CommandeEntreprenerComponent implements OnInit {

  p: number = 1;
  searchItem: string;
  lists: any = {};
  constructor(private commandeService: CommandeService ) { }

  ngOnInit(): void {
    this.loadall();
  }

  loadall(){
    this.commandeService.getAllByUserEntreprener().subscribe(
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
