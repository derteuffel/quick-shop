import {User} from "./user";
import {SessionCoaching} from "./session-coaching";

export class Coaching {

  id: number;
  description: string;
  phone: string;
  phone1: string;
  email: string;
  region: string;
  amount: number;
  creationDate: Date;
  startDate: Date;
  user: User;
  sesions: SessionCoaching[];



}
