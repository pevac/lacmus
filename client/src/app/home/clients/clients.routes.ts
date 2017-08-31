import { ClientsComponent } from "./clients.component";
import { ClientsListRouter} from "./list";
import { ClientsFormRouter } from "./form";
import { Ng2StateDeclaration } from "@uirouter/angular";

export const routes: Ng2StateDeclaration[] = [
      { url: "/clients",  name: "home.clients", component: ClientsComponent},
      ClientsListRouter, ClientsFormRouter
];
