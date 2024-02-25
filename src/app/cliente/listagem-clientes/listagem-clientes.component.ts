import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { NovoClienteComponent } from '../novo-cliente/novo-cliente.component';
import { NgbHighlight, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { DeletarClienteComponent } from '../deletar-cliente/deletar-cliente.component';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader, SortEvent } from '../../models/sort';
import { CPFPipe } from '../../services/cpf-pipe';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, ReactiveFormsModule, NgbHighlight, NgbdSortableHeader, CPFPipe],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss'
})
export class ListagemClientesComponent {
  clientes: Cliente[] = []
  page: number = 0
  pageSize: number = 5
  count: number = 0
  filterCtrl = new FormControl();

  private options: NgbModalOptions = {
    beforeDismiss: () => {
      this.getClientes();
      return true;
    }
  };


  constructor(private clienteService: ClienteService, private modalService: NgbModal) {
    this.filterCtrl.valueChanges.subscribe(
      (text) => {
        console.log(text)
        this.getClientes()
      },
    );
  }

  ngOnInit(): void {
    this.getClientes()
  }

  onEnterFilterClicked(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  onSort({ column, direction }: SortEvent) {
    this.getClientes(column as string, direction)
  }

  pageChanged(page: number) {
    this.getClientes()
  }

  getClientes(orderField: string = '', orderDirection: string = ''): void {

    this.clienteService.getClientes(this.pageSize, this.page, orderField, orderDirection, this.filterCtrl.value ?? '')
      .subscribe(clientePaginado => {
        this.clientes = clientePaginado.clientes
        this.count = clientePaginado.count
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
