import {Component, OnInit} from "@angular/core";
import {ClientsResourcesService} from "../../../services";
import { ClientForm, ClientResponce } from "../../../model";
import { Transition } from "@uirouter/angular";

@Component({
  selector: "clients-form",
  templateUrl: "./clientsForm.component.html",
})

export class ClientsFormComponent implements OnInit {
    public client: ClientForm = new ClientForm(null);
    public action: string = "create";

    constructor(private resources: ClientsResourcesService, private trans: Transition) { };

    public ngOnInit() {
        let params = this.trans.params();
        this.client = params.client ? params.client : new ClientForm(null);
        this.action = params.action;
    }

    public goToList() {
        this.trans.router.stateService.go("home.clients.list", { pagination: this.trans.params().pagination });
    }

    public createClient(): void {
        let cln = new ClientResponce(this.client);
        this.resources.createClient(cln)
            .subscribe(
                (data) => {this.goToList()},
                (err) => {console.error(err)},
                () => {console.log("done")}
            )
    }

    public updateClient(): void {
        let cln = new ClientResponce(this.client);
        this.resources.updateClient(cln)
            .subscribe(
                (data) => {this.goToList()},
                (err) => {console.error(err)},
                () => {console.log("done")}
            )
    }
}
