export class Boutique{
  id:	number;
  name:	string;
  localisation:	string;
  phone:	string;
  cardNumber:	string;
  region:	string;
  status:	boolean;
  activationCode:	string



constructor(id: number, name: string, localisation: string, phone: string, cardNumber: string,
            region: string, status: boolean, activationCode: string){

this.id = id;
this.name = name;
this.localisation = localisation;
this.phone = phone;
this.cardNumber = cardNumber;
this.status = status;
this.region = region;
this.activationCode = activationCode;
}

}
