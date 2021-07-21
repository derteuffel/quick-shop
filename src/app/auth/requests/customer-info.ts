export class CustomerInfo {

    fullName: string;
    region: string;
    phone: string;
    amount: string;
    devise: string;
    paymentMethod: string;
    email: string;
    duration: number;
    idNumber: string;

    constructor(fullName: string, email: string,
                region: string, phone: string, devise: string, idNumber: string,
        amount: string, paymentMethod: string) {
        this.fullName = fullName;
        this.devise = devise;
        this.email = email;
        this.amount = amount;
        this.region = region;
        this.phone = phone;
        this.idNumber = idNumber;
        this.paymentMethod = paymentMethod;
    }

}
