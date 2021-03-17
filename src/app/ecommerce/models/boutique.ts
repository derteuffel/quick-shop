export class Boutique{
    id: number;
    name: string;
    localisation: string;
    orangeNumber: string;
    mtnNumber: string;
    othernumber: string;
    status: boolean;



constructor(id: number, name: string, localisation: string, orangeNumber: string, mtnNumber: string,
othernumber: string, status: boolean){

this.id = id;
this.name = name;
this.localisation = localisation;
this.orangeNumber = orangeNumber;
this.mtnNumber = mtnNumber;
this.othernumber = othernumber;
this.status = status; 
}

}