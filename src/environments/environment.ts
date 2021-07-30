// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
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

  ACCOUNT_SIMPLE: `${url}api/account`,

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

export class AppConstants{
  private static API_BASE_URL = "http://localhost:8181/";
  private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
  private static REDIRECT_URL = "?redirect_uri=http://localhost:4200/socialredirect";
  public static API_URL = AppConstants.API_BASE_URL + "api/";
  public static AUTH_API = AppConstants.API_URL + "auth/";
  public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
  public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
  public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
}