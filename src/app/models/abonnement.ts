import {User} from "./user";
import {TypeAbonnement} from "./typeAbonnement";

export class Abonnement {

  id: number;
  startDate: any;
  endDate: any;
   enabled: boolean;
   type: TypeAbonnement;
   user: User;
}
