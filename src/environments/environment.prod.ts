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

}

export class AppConstants{
  private static API_BASE_URL = "https://yesbinspire.com:8282/";
  private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
  private static REDIRECT_URL = "?redirect_uri=https://yesbinspire.com:8282/api/auth/redirect";
  public static API_URL = AppConstants.API_BASE_URL + "api/";
  public static AUTH_API = AppConstants.API_URL + "auth/";
  public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
  public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
  public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
}
