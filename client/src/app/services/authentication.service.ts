import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Authentication } from "../model";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    
    public login(auth: Authentication) {
        return this.http.post("http://localhost:8585/api/authenticate", auth)
            .map((response: Response) => {
                console.log(response)
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
