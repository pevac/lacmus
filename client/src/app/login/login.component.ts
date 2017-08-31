import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/";
import { Transition } from "@uirouter/angular";
import { Authentication } from "../model";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
})

export class LoginComponent { 
  public user: Authentication = new Authentication();

  constructor(private authentication: AuthenticationService, private trans: Transition) { 
  }

  public login() {
    this.authentication.login(this.user)
    .subscribe(
      (user) => {
        if (user&& user.token) {
          this.trans.router.stateService.go("home");
        }
      },
      (err) => {console.error(err)},
      () => {console.log("done")},
    );
  }
}
