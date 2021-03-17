import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { Boutique } from '../ecommerce/models/boutique';
import { BoutiqueService } from '../ecommerce/services/boutique.service';

@Component({
  selector: 'app-update-boutique',
  templateUrl: './update-boutique.component.html',
  styleUrls: ['./update-boutique.component.css']
})
export class UpdateBoutiqueComponent implements OnInit {

  boutique: Boutique;
  message: string;
  constructor(private activatedRoute: ActivatedRoute, private boutiqueService: BoutiqueService, private router: Router) { }

  ngOnInit(): void {

    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getBoutique(id){
    this.boutiqueService.getBoutique(id).subscribe(
      data => {
        this.boutique = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onSubmit(){

    this.boutiqueService.updateBoutique(this.boutique, this.boutique.id).subscribe(
      data => {
        console.log('you updated successfully your item');
        this.router.navigateByUrl('/boutiques');
      }, error => {
        console.log(error);
      }
    );
  }

}
