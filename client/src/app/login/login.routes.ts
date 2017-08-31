import { LoginComponent } from "./login.component";
import { Ng2StateDeclaration } from "@uirouter/angular";

export const routes: Ng2StateDeclaration[] = [
      { url: "/login", name: "login", component: LoginComponent },
];
