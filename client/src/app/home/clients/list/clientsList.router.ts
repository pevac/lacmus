import { ClientsListComponent } from "./";
import { Ng2StateDeclaration } from "@uirouter/angular";
import { ClientsResourcesService } from "../../../services";

export const ClientsListRouter: Ng2StateDeclaration = { 
    url: "/list",  
    name: "home.clients.list", 
    component: ClientsListComponent,
    params: {
        pagination: null
    },
    onExit: function(){
        localStorage.removeItem("pagination");
    }
};