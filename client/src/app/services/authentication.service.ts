import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    
    public login(name: string, pswrd: string): Observable<any> {
        return this.http.post("/users/authenticate", { username: name, password: pswrd })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem("user", JSON.stringify(user));
                }
                return user;
            });
    }
    
    public logout(): void {
        localStorage.removeItem("user");
    }
}
