import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { NovoClienteComponent } from '../novo-cliente/novo-cliente.component';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { DeletarClienteComponent } from '../deletar-cliente/deletar-cliente.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss'
})
export class ListagemClientesComponent {
  clientes: Cliente[] = []

  private options: NgbModalOptions = {
    beforeDismiss: () => {
      this.getClientes();
      return true;
    }
  };

  constructor(private clienteService: ClienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClientes()
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => {
        this.clientes = clientes
      })
  }

  novoCliente(): void {
    const modalRef = this.modalService.open(NovoClienteComponent, this.options)
  }

  editarCliente(id: number): void {
    const modalRef = this.modalService.open(EditarClienteComponent, this.options)
    modalRef.componentInstance.loadCliente(id);
  }

  deletarCliente(id: number): void {
    const modalRef = this.modalService.open(DeletarClienteComponent, this.options)
    modalRef.componentInstance.loadCliente(id);
  }
}
