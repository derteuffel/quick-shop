// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://localhost:8181'
};

export const BACK_BASE_URL = "http://localhost:8181";

const url = 'http://localhost:8181/';

export const API = {


  /** Produits **/


  PRODUITS:  `${url}api/produits`,

  /** Commandes **/

  COMMANDES: `${url}api/commandes`,


  /** Boutiques **/

  BOUTIQUES: `${url}api/boutiques`,

  /** Coachings **/

  COACHINGS: `${url}api/coachings`,

  /** Account **/

  ACCOUNT: `${url}api/account/admin`,

  /** Micro-finance **/

  MICROFINANCES: `${url}api/microfinancements`,

  /** Loans  **/

  LOANS: `${url}api/loans`,

  /** Session coaching**/

  SESSIONS: `${url}api/sessioncoachings`,

  /** Functionnalities **/

  FUNCTIONALITY: `${url}api/functionnalities`,

  /** Abonnement **/

  ABONNEMENT: `${url}api/abonnements`,



  /** Temoignages **/

  TEMOIGNAGE: `${url}api/temoignages`,

  /** Rating **/

  RATING: `${url}api/ratings`,

}

//utilisateur connecté
export var USER: any;
export function getUsers() {
  let storage: string = localStorage.getItem('lgl-user-profil');
  if (storage) {
    USER = JSON.parse(storage);
  }else {
    USER = {};
  }
}


/**
 * fonction permettant de connaitre si l'utilisateur connecté
 * possède les droits d'accéder à des fonctionnalités qui sont passées en paramètres à la fonction
 * @param func
 */
export function hasFunctionality(func: string) {
  getUsers();
  for (const f of USER.functionalities) {
    if (func == f.code) {
      return true;
    }
  }
  return false;
}
