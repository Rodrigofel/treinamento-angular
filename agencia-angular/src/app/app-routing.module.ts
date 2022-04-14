import { ContasComponent } from './pages/contas/contas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { ContasSaqueDepositoComponent } from './pages/contas/contas-saque-deposito/contas-saque-deposito.component';

const routes: Routes = [
  {path:'clientes', component:ClientesComponent  },
  {path:'clientes/cadastrar', component:ClientesCadastrarEditarComponent  },
  {path:'clientes/editar/:id', component:ClientesCadastrarEditarComponent  },
  {path:'contas', component:ContasComponent  },
  {path:'contas/saque/:id', component:ContasSaqueDepositoComponent  },
  {path:'contas/deposito/:id', component:ContasSaqueDepositoComponent  },
  {path:'contas/saque', component:ContasSaqueDepositoComponent  },
  {path:'contas/deposito', component:ContasSaqueDepositoComponent  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
