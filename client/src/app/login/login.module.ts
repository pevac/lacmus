import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { UIRouterModule } from "@uirouter/angular";

import { LoginComponent } from "./login.component";
import { routes } from "./login.routes";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UIRouterModule.forChild({ states: routes }),
  ],
})

export class LoginModule {
    public static routes = routes;
}
