export class Boutique{
    id: number;
    name: string;
    localisation: string;
    orangeNumber: string;
    mtnNumber: string;
    othernumber: string;
    status: boolean;
    activationCode: string;



constructor(id: number, name: string, localisation: string, orangeNumber: string, mtnNumber: string,
othernumber: string, status: boolean, activationCode: string){

this.id = id;
this.name = name;
this.localisation = localisation;
this.orangeNumber = orangeNumber;
this.mtnNumber = mtnNumber;
this.othernumber = othernumber;
this.status = status; 
this.activationCode = activationCode;
}

}