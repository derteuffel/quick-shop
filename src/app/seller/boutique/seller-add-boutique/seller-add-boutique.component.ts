import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-seller-add-boutique',
  templateUrl: './seller-add-boutique.component.html',
  styleUrls: ['./seller-add-boutique.component.css']
})
export class SellerAddBoutiqueComponent implements OnInit {

  form: any = {};

  message: string;
  constructor(private boutiqueService: BoutiqueService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.boutiqueService.saveBoutique(this.form).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/seller/boutiques');
      }, error => {
        console.log(error);
      }
    );
  }


}
