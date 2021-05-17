import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgSelectConfig} from "@ng-select/ng-select";
import {ToastService} from "./services/toast.service";

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

  showStandard() {
    this.toastService.show('I am a standard toast', {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Toast Header'
    });
  }
  showError() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

  showCustomToast(customTpl) {
    this.toastService.show(customTpl, {
      classname: 'bg-info text-light',
      delay: 3000,
      autohide: true
    });
  }


  showtoast() {
    this.toastr.success('test sur les roast', 'title');

  }
}
