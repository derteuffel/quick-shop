import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CommandeService} from '../../../services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  p: number = 1;
  searchItem: string;
  lists: any = {};
  currentCommande: any;
  constructor(private commandeService: CommandeService , private modalService: NgbModal) { }

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

  setCommande(contentDetails, event){
    this.modalService.open(contentDetails, {size: "lg"});
    this.currentCommande = event;
  }

}
