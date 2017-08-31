import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpModule }    from "@angular/http";
import { CommonModule } from "@angular/common";
import { Category, UIRouterModule, UIView } from "@uirouter/angular";
import { NgxPaginationModule } from "ngx-pagination";
import { DateValueAccessorModule } from "angular-date-value-accessor";
import { AppComponent } from "./app.component";
import { NoContentComponent } from "./no-content";
import { ROUTES } from "./app.routes";
import { HomeModule } from "./home";
import { LoginModule } from "./login";
import { AuthenticationService, ClientsResourcesService } from "./services";

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, CommonModule, NgxPaginationModule,
    DateValueAccessorModule,  HomeModule, LoginModule,
    UIRouterModule.forRoot({ states: ROUTES, useHash: true, otherwise: { state: "login", params: {} }}) ],
  providers: [ ClientsResourcesService, AuthenticationService ],
  declarations: [ AppComponent, NoContentComponent ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
