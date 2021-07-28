export class CustomerInfo {

    fullName: string;
    province: string;
    commune: string;
    phone: string;
    amount: string;
    devise: string;
    paymentMethod: string;
    email: string;
    duration: number;
    idNumber: string;
    sector: string;

    constructor(fullName: string, email: string,
                province: string,commune:string, phone: string, devise: string, idNumber: string,
        amount: string, paymentMethod: string, duration: number, sector: string) {
        this.fullName = fullName;
        this.devise = devise;
        this.email = email;
        this.amount = amount;
        this.province = province;
        this.commune = commune;
        this.phone = phone;
        this.idNumber = idNumber;
        this.paymentMethod = paymentMethod;
        this.duration = duration;
        this.sector = sector;
    }

}
