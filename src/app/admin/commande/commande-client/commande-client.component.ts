import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {CommandeService} from '../../../services/commande.service';

@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.css'],
  providers: [MessageService]
})
export class CommandeClientComponent implements OnInit {

  p: number = 1;
  searchItem: string;
  lists: any = {};
  constructor(private commandeService: CommandeService, private messageService: MessageService ) { }

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

  cancelOrder(id){
    this.commandeService.cancel(id).subscribe(
      data =>{
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Vous avez annuler votre commande', sticky: true});
      },
      error => {
        this.messageService.add({severity: 'success', summary: 'Error', detail: 'Echec lors de l\'annulation de votre commande', sticky: true});
      }
    );
  }

}
