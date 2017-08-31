import { NgModule } from "@angular/core";
import { UIRouterModule } from "@uirouter/angular";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { DateValueAccessorModule } from "angular-date-value-accessor";
import { routes } from "./clients.routes";
import { ClientsComponent } from "./clients.component";
import { ClientsListComponent } from "./list";
import { ClientsFormComponent } from "./form";

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
    ClientsFormComponent,
  ],
  imports: [
    CommonModule, NgxPaginationModule, FormsModule, DateValueAccessorModule,
    UIRouterModule.forChild({ states: routes }),
  ],
})

export class ClientsModule {
  // public static routes = routes;
}
