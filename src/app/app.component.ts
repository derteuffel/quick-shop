import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgSelectConfig} from '@ng-select/ng-select';
import {ToastService} from './services/toast.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-eugen';

  constructor(
    public toastService: ToastService,
    public toastr: ToastrService,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Aucune donnée trouver';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
    this.config.placeholder = 'Entrer un fournisseur';
    this.config.appearance = 'outline';
  }

}
