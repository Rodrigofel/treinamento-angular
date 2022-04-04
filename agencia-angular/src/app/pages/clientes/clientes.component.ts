import { ClientesService } from 'src/app/services/clientes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService ) { }
  clientes: any[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }
  listarTodos(){
    this.clientesService.listarTodosClientes().subscribe((result: any) => {
        this.clientes =result;
        console.log(this.clientes);
    });
  }

}
