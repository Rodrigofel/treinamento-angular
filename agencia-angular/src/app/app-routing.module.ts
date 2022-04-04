import { ContasComponent } from './pages/contas/contas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'clientes', component:ClientesComponent
  },
  {
    path:'contas', component:ContasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
