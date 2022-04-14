import { ICliente } from './../../interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService ) { }
  clientes: ICliente[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }
  listarTodos(){
    this.clientesService.listarTodosClientes().subscribe((result: ICliente[]) => {
        this.clientes =result;
        console.log(this.clientes);
    });
  }

 confirmar(id: number) {
    Swal.fire({
      title: 'Você quer deletar?',
      text: "Isso não vai voltar mais nunca, quer mesmo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Vai logo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.remover(id).subscribe(result => {
          Swal.fire(
            'Removido!',
            'Seu cliente foi removido com sucesso!',
            'success'
          );
          this.listarTodos();
        }, error => {
          console.error(error);
        });
      }
    })
  }
}

