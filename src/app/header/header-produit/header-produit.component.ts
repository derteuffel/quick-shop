import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header-produit',
  templateUrl: './header-produit.component.html',
  styleUrls: ['./header-produit.component.scss']
})
export class HeaderProduitComponent implements OnInit {

  produitForm: FormGroup;

  provinces: string[];
  communes: string[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi','Muha','Mukaza','Ntahangwa','Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
  'Mutimbuzi','Nyabiraba','Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda','Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha',
'Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira','Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro','Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo',
'Bugabira','Busoni',' Bwambarangwe',' Gitobe','Kirundo','Ntega','Vumbi','Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo',
'Bukeye','Kiganda','Mbuye',' Muramvya','Rutegama','Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro',
'Bisoro','Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka','Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo',
'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
this.init();  
}

  init(){
    this.produitForm = new FormGroup({
      location: new FormControl(''),
      name: new FormControl(''),
      minPrice: new FormControl(''),
      maxPrice: new FormControl('')
    });
  }

  clear(){
    this.produitForm = new FormGroup({
      location: new FormControl(''),
      name: new FormControl(''),
      minPrice: new FormControl(''),
      maxPrice: new FormControl('')
    });
  }

  onProduitSearch(){
    const produitNavigationExtras: NavigationExtras = {
      queryParams: {
        'values':JSON.stringify(this.produitForm.value)
      }
    };
    this.clear();
 this.router.navigate(['/ecommerce/produits'], produitNavigationExtras);
 window.location.reload();
  }

}
