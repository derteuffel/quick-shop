export const environment = {
  production: true
};

export const BACK_BASE_URL = "https://yesbinspire.com:8282";

const url = 'https://yesbinspire.com:8282/';

export const API = {


  /** Produits **/

  PRODUITS:  `${url}api/produits`,

  /** Commandes **/

  COMMANDES: `${url}api/commandes`,
  /** Loans **/

  LOANS: `${url}api/loans`,


  /** Boutiques **/

  BOUTIQUES: `${url}api/boutiques`,

  /** Coachings **/

  COACHINGS: `${url}api/coachings`,

  /** Account **/

  ACCOUNT: `${url}api/account/admin`,

  /** Micro-finance **/

  MICROFINANCES: `${url}api/microfinancements`,

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
  private static API_BASE_URL = "https://yesbinspire.com:8282/";
  private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
  private static REDIRECT_URL = "?redirect_uri=https://www.yesbinspire.com/socialredirect";
  public static API_URL = AppConstants.API_BASE_URL + "api/";
  public static AUTH_API = AppConstants.API_URL + "auth/";
  public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
  public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
  public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
}
