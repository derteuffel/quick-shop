import { Role } from "./role";

export class User{
    id: number;
    username: string;
    email: string;
    password: string;
    enabled: boolean;
    token: string;
    createdDate: Date;
    role: Role;

    constructor(id: number, username:string, email: string, createdDate: Date, token: string, role: Role){
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdDate = createdDate;
        this.role = role;
        this.token = token;
    }
}
