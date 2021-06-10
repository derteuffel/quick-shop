export const environment = {
  production: true
};


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

  /** Session coaching**/

  SESSIONS: `${url}api/sessioncoachings`,

}
