import {User} from "./user";

export class Microfinance {

  id: number;
  bankName: string;
  province: string;
  commune: string;
  amount: number;
  paymentMode: string;
  creationDate: string;
  devise: string;
  fullName: string;
  phone: string;
  email: string;
  sector: string;
  duration: number;
  idNumber: string;
  status: boolean;
  user: User;
}
