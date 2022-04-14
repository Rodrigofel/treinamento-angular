import { ContasService } from 'src/app/services/contas.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(private contasService: ContasService ) { }
  contas: any[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }
  listarTodos(){
    this.contasService.listarTodasContas().subscribe((result: any) => {
        this.contas =result;
        console.log(this.contas);
    });
  }
}
