export const environment = {
  production: true,
  baseURL: 'http://144.91.75.89:8181'
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