import { Role } from "./role";

export class User{
    id: number;
    fullName: string;
   province: string
    username: string;
    email: string;
    phone: string;
    password: string;
    enabled: boolean;
    token: string;
    createdDate: Date;
    birth_date: Date;
    secteurActivite: any;
    role: Role;
    id_number: string;
    interest: string;
    commune:string;

    constructor(id: number, username:string, email: string, createdDate: Date, token: string, role: Role){
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdDate = createdDate;
        this.role = role;
        this.token = token;
    }
}
