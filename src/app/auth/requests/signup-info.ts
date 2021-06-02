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

    constructor(fullName: string, username: string, email: string,
        location: string, phone: string, birthDate: Date, 
        secteurActivite: string, password: string) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.location = location;
        this.phone = phone;
        this.birthDate = birthDate;
        this.secteurActivite = secteurActivite;
        this.role = 'ENTREPRENER';
    }
}