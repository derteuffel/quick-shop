import {User} from "./user";
import {TypeAbonnement} from "./typeAbonnement";


export class Abonnement {

  id: number;
  startDate: any;
  endDate: any;
  enabled: boolean;
  type: TypeAbonnement;
   user: User;

  constructor(startDate: any, endDate: any, type: TypeAbonnement) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
  }
}
