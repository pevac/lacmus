import { Ng2StateDeclaration } from "@uirouter/angular";
import { NoContentComponent } from "./no-content";

export const ROUTES: Ng2StateDeclaration[] = [
  { url: "**", name: "error", component: NoContentComponent },
];
