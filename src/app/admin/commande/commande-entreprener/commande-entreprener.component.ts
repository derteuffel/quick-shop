import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  currentCommande: any;
  constructor(private commandeService: CommandeService, private modalService: NgbModal ) { }

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

  setCommande(contentDetails, event){
    this.modalService.open(contentDetails, {size: "lg"});
    this.currentCommande = event;
  }

}
