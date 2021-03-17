import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { BoutiqueService } from '../ecommerce/services/boutique.service';

@Component({
  selector: 'app-add-boutique',
  templateUrl: './add-boutique.component.html',
  styleUrls: ['./add-boutique.component.css']
})
export class AddBoutiqueComponent implements OnInit {

  form: any = {};

  message: string;
  constructor(private boutiqueService: BoutiqueService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.boutiqueService.saveBoutique(this.form).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/boutiques');
      }, error => {
        console.log(error);
      }
    );
  }


}
