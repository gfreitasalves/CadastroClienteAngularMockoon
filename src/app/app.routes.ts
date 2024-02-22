import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListagemClientesComponent } from './cliente/listagem-clientes/listagem-clientes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'clientes', component: ListagemClientesComponent }
];
