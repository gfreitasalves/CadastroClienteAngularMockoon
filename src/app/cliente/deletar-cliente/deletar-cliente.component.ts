import { Component, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-deletar-cliente',
  standalone: true,
  imports: [],
  templateUrl: './deletar-cliente.component.html',
  styleUrl: './deletar-cliente.component.css'
})
export class DeletarClienteComponent {
  activeModal = inject(NgbActiveModal)
  cliente?: Cliente = undefined

  constructor(private clienteService: ClienteService) { }

  loadCliente(id: number): void {
    this.clienteService.getCliente(id)
      .subscribe(cliente => {
        this.cliente = cliente
      })
  }

  deletarCliente() {
    if (this.cliente != undefined) {
      this.clienteService.deleteCliente(this.cliente.id)
    }
  }
}
