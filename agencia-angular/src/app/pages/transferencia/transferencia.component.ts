import { ITransferencia } from './../../interfaces/transferencia.service';
import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {


    carregaTrasnferencia: ITransferencia = {
      numeroContaDestino: '' ,
      agenciaDestino: '',
      numeroContaOrigem:'',
      agenciaOrigem:'',
      valor: 1
     };
    formTransferencia: FormGroup = this.preencheFormGroup(this.carregaTrasnferencia);
    constructor(
      private contasService: ContasService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
     const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

     this.contasService.consultarContaPorId(id).subscribe(
      (result: IConta) => {
        const transferencia: ITransferencia =({
          agenciaOrigem: result.agencia,
          numeroContaOrigem: result.numero,
          agenciaDestino:'',
          numeroContaDestino:'',
          valor:0
        })
        this.formTransferencia = this.preencheFormGroup(transferencia);
    });

    }

    preencheFormGroup(Transferencia: ITransferencia): FormGroup {
      return new FormGroup({
        agenciaOrigem: new FormControl(Transferencia.agenciaOrigem, Validators.required),
        numeroContaOrigem: new FormControl(Transferencia.numeroContaOrigem, Validators.required),
        agenciaDestino: new FormControl(Transferencia.agenciaDestino),
        numeroContaDestino: new FormControl(Transferencia.numeroContaDestino),
        valor: new FormControl(),
      });
    }
    enviar() {

      const transferencia: ITransferencia = this.formTransferencia.value;

      this.contasService.transferir(transferencia).subscribe((result) => {
        Swal.fire(
          'Sucesso','Trasnferencia realizado', 'success'
        );
        this.router.navigate(['/contas']);
      });

    }
}
