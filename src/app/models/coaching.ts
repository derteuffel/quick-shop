import {User} from "./user";
import {SessionCoaching} from "./session-coaching";

export class Coaching {

  id: number;
  title: string
  description: string;
  phone: string;
  email: string;
  region: string;
  amount: number;
  devise: string;
  logo: string;
  creationDate: Date;
  startDate: Date;
  user: User;
  sesions: SessionCoaching[];



}
