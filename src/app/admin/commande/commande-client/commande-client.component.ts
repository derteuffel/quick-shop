import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../../services/commande.service';

@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.css']
})
export class CommandeClientComponent implements OnInit {

  p: number = 1;
  searchItem: string;
  lists: any = {};
  constructor(private commandeService: CommandeService ) { }

  ngOnInit(): void {
    this.loadall();
  }

  loadall(){
    this.commandeService.getAllByUserClient().subscribe(
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
