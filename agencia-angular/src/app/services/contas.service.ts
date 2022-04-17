import { ITransferencia } from './../interfaces/transferencia.service';
import { ISaqueDeposito } from './../interfaces/saque-deposito';
import { IConta } from './../interfaces/conta';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {​​​ HttpClient }​​​ from'@angular/common/http';
import { Observable } from 'rxjs';

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
  depositar(saqueDeposito: ISaqueDeposito){
    return this.http.put(`${this.api}/${this.endpoint}/deposito`, saqueDeposito);
  }
  sacar(saqueDeposito: ISaqueDeposito){
    return this.http.put(`${this.api}/${this.endpoint}/saque`, saqueDeposito);
  }
  consultarContaPorId(id: number){
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`);
  }
  transferir(transferencia: ITransferencia){
    return this.http.put(`${this.api}/${this.endpoint}/transferencia`, transferencia);
  }
}
