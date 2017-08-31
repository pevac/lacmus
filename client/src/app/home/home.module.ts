import { NgModule } from "@angular/core";
import { UIRouterModule } from "@uirouter/angular";

import { ClientsModule } from "./clients/";

import { routes } from "./home.routes";
import { HomeComponent } from "./home.component";
import { SidebarComponent } from "./sidebar";

@NgModule({
  declarations: [
    SidebarComponent,
    HomeComponent,
  ],
  imports: [
    UIRouterModule.forChild({ states: routes }),
    ClientsModule,
  ],
})

export class HomeModule {
  public static routes = routes;
}
