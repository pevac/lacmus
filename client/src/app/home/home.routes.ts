import { HomeComponent } from "./home.component";
import { Ng2StateDeclaration } from "@uirouter/angular";

export const routes: Ng2StateDeclaration[] = [
      { url: "/home",  name: "home", component: HomeComponent},
];
