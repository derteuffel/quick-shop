export const environment = {
  production: true
};


const url = 'http://144.91.75.89:8181/';

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

  ACCOUNT: `${url}api/account`,

  /** Micro-finance **/

  MICROFINANCES: `${url}api/microfinancements`,

  /** Session coaching**/

  SESSIONS: `${url}api/sessioncoachings`,

}
