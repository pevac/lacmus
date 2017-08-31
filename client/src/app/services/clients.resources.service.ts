import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { ClientForm, ClientResponce } from "../model"

@Injectable()
export class ClientsResourcesService {
  private clientsUrl = "http://localhost:8585/api/clients";

  constructor (private http: Http) { }

  public getClients(page: Number, itemsPerPage: Number): Observable<any> {
    return this.http.get(`${this.clientsUrl}/${page}/${itemsPerPage}`, this.jwt())
                    .map((responce: Response) => responce.json())
  }

  public getClientById(id: number): Observable<any> {
    return this.http.get(`${this.clientsUrl}/${id}`, this.jwt())
                    .map((response: Response) => response.json());
  }

  public createClient(client: ClientResponce): Observable<any> {
    return this.http.post(this.clientsUrl, client, this.jwt())
                    .map((responce: Response) => responce)
  }

  public updateClient(client: ClientResponce): Observable<any> {
    return this.http.put(`${this.clientsUrl}/${client.id}`, client, this.jwt())
                    .map((responce: Response) => responce)
  }

  public deleteClient(client: ClientResponce): Observable<any> {
    return this.http.delete(`${this.clientsUrl}/${client.id}`, this.jwt())
                    .map((responce: Response) => responce)
  }


  private jwt() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        let hd = new Headers({ Authorization: "Basic sdfsdf" });
        return new RequestOptions({ headers: hd });
    }
  }
}
