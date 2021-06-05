export class SignUpInfo{
    fullName: string;
    location: string;
    phone: string;
    birthDate: Date;
    secteurActivite: string;
    username: string;
    email: string;
    role: string;
    password: string;
    idNumber: string;
    interest: string;

    constructor(fullName: string, username: string, email: string,
        location: string, phone: string, birthDate: Date, idNumber: string,
        secteurActivite: string, password: string, role: string, interest: string) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.location = location;
        this.phone = phone;
        this.birthDate = birthDate;
        this.secteurActivite = secteurActivite;
        this.role = role;
        this.idNumber = idNumber;
        this.interest = interest;
    }
}