import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
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
  constructor(private commandeService: CommandeService , private modalService: NgbModal,
    private messageService: MessageService) { }

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

  validReservePaiement(id){
    this.commandeService.checkoutByReserve(id).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Record is activated successully', detail:'record action'});
      }
    );
  }

  /** toast message function primeng  **/
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

}
