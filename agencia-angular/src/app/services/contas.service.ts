import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {​​​ HttpClient }​​​ from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  api = environment.api;
  endpoint = 'contas';
  constructor(private http: HttpClient) { }

  listarTodasContas() {
    return this.http.get(`${this.api}/${this.endpoint}/`);
  }
}
