import { ClientsFormComponent } from "./";
import { Ng2StateDeclaration } from "@uirouter/angular";

export const ClientsFormRouter: Ng2StateDeclaration = { 
    url: "/form",  
    name: "home.clients.form", 
    component: ClientsFormComponent,
    params: {
        client: null,
        action: "",
        pagination: null
    }
};