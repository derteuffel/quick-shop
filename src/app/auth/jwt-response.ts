export class JwtResponse {
    accessToken: string;
	  type: string;
	  id: number;
	  username: string;
	  email: string;
    roles: [];
    constructor(accessToken: string = '', id: number = null, username: string = '', email: string = '', roles: []){
      this.accessToken = accessToken;
      this.id = id;
      this.username = username;
      this.roles = roles;
    }
}