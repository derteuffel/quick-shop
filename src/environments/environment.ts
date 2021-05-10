// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

const url = 'http://localhost:8081/';

export const API = {


  /** Produits **/


  SAVE_PRODUIT:  `${url}api/produits/admin`,

  GET_ONE_PRODUIT: `${url}api/produits/all`,

  UPLOAD_FILES_PRODUIT: `${url}api/produits/admin/uploads`,

  UPLOAD_FILE_PRODUIT: `${url}api/produits/admin/upload`,

  UPDATE_PRODUIT: `${url}api/produits/admin`,

  DELETE_PRODUIT: `${url}api/produits/admin`,

  GET_ALL_PRODUITS: `${url}api/produits/all`,

  FIND_ALL_BY_CATEGORY_AND_GENRE: `${url}api/produits/all/sort`,

  FIND_ALL_BY_MARQUE_AND_GENRE: `${url}api/produits/all/marque`,

  FIND_ALL_BY_COLOR_AND_GENRE: `${url}api/produits/all/colors`,

  FIND_ALL_MOBILE: `${url}api/produits/all/mobile`,

  FIND_ALL_ADMIN: `${url}api/produits/admin`,

  FIND_ALL_BY_BOUTIQUE: `${url}api/produits/boutique`,

  FIND_ALL_BY_CATEGORY: `${url}api/produits/all/category`,

  FIND_ALL_BY_GENRE: `${url}api/produits/all/genre`,

  FIND_ALL_BY_QUALITY: `${url}api/produits/all/quality`,

}
