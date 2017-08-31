import { Component, OnInit } from "@angular/core";
import { Transition } from "@uirouter/angular";
import { ClientsResourcesService } from "../../../services";
import { ClientForm, ClientResponce } from "../../../model";
import "rxjs/add/operator/map";

@Component({
  selector: "clients-list",
  templateUrl: "./clientsList.component.html",
})

export class ClientsListComponent implements OnInit {
  public clients: ClientForm[];
  public itemsPerPage: Number = 10;
  public totalItems: Number;
  public page: Number = 1;

  constructor(private resources: ClientsResourcesService, private trans: Transition) { };

  public ngOnInit(): void {
   this.paginationSetState();
    this.getClients();
  }

  public paginationSetState() {
    let spPagination = this.trans.params().pagination;
    let lsPagination = JSON.parse(localStorage.getItem("pagination"));

    if(spPagination != null) {
      this.page = spPagination.page;
      this.itemsPerPage = spPagination.itemsPerPage;
      // this.paginationSetToStorage();
    } else {
      if(lsPagination != null) {
        this.page = lsPagination.page;
        this.itemsPerPage = lsPagination.itemsPerPage;
      } else {
        this.page = 1;
        this.itemsPerPage = 10;
      }
    }
  }

  public paginationSetToStorage(): void{
    localStorage.setItem("pagination", JSON.stringify({
      page: this.page,
      itemsPerPage: this.itemsPerPage
    }));
  }

  public goToForm(customer: ClientForm, actn: string): void {
    this.trans.router.stateService.go("home.clients.form", { 
      client: customer, 
      action: actn,
      pagination: {
        page: this.page,
        itemsPerPage: this.itemsPerPage
      }
    });
  }

  public getClients(): void {
    this.resources.getClients(this.page, this.itemsPerPage)
      .subscribe(
        (data) => {
          this.totalItems = data.totalItems;
          this.clients = data.clients.map((item) => new ClientForm(item));
          this.paginationSetToStorage();
        },
        (err) => {console.error(err)},
        () => {console.log("done")},
      );
  }

  public deleteClient(client: ClientForm) {
    this.resources.deleteClient(new ClientResponce(client))
      .subscribe(
        (data) => {this.getClients();},
        (err) => {console.error(err)},
        () => {console.log("done")}
      )
  }
}
