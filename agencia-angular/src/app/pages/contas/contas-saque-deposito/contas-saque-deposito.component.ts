import { ICliente } from './../../../interfaces/cliente';
import { IConta } from './../../../interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ISaqueDeposito } from './../../../interfaces/saque-deposito';

@Component({
  selector: 'app-contas-saque-deposito',
  templateUrl: './contas-saque-deposito.component.html',
  styleUrls: ['./contas-saque-deposito.component.css']
})
export class ContasSaqueDepositoComponent implements OnInit {
  carregaConta: IConta = {
    id: 0,
    numero: '' ,
    agencia: '',
    saldo: 1,
    cliente: {
      id: 0,
      nome: '',
      cpf: '',
      email: '',
      observacoes: '',
      ativo: true,
    },
   };
  formConta: FormGroup = this.preencheFormGroup(this.carregaConta);
  constructor(
    private contasService: ContasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
   const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      this.contasService.consultarContaPorId(id).subscribe(
        (result: IConta) => {
          this.formConta = this.preencheFormGroup(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  preencheFormGroup(contas: IConta): FormGroup {
    return new FormGroup({
      agencia: new FormControl(contas.agencia),
      numero: new FormControl(contas.numero, Validators.required),
      saldo: new FormControl(contas.saldo, Validators.required),
      valor: new FormControl(),
    });
  }
  enviar() {

    const contas: IConta = this.formConta.value;
    const saqueDeposito: ISaqueDeposito =({
    agencia: contas.agencia,
    numeroConta:contas.numero,
    valor: Number((<HTMLInputElement>document.getElementById("valor")).value)});//Number( this.activatedRoute.snapshot.paramMap.get('valor')?.valueOf),});

    if(window.location.href.includes('deposito')){
    this.contasService.depositar(saqueDeposito).subscribe((result) => {
      Swal.fire(
        'Sucesso','Depósito realizado', 'success'
      );
      this.router.navigate(['/contas']);
    });
  }else{
    this.contasService.sacar(saqueDeposito).subscribe((result) => {
      Swal.fire(
        'Sucesso','Saque realizado', 'success'
      );
      this.router.navigate(['/contas']);
    });
    }
  }
  depoistoOuSaque() {
    return window.location.href.includes('deposito');
  }
}
