import {User} from "./user";
import {SessionCoaching} from "./session-coaching";

export class Coaching {

  id: number;
  title: string
  description: string;
  phone: string;
  email: string;
  province: string;
  commune: string;
  amount: number;
  devise: string;
  logo: string;
  creationDate: Date;
  startDate: Date;
  user: User;
  type: string;
  sesions: SessionCoaching[];



}
