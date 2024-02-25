import { Component, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../models/cliente';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-deletar-cliente',
  standalone: true,
  imports: [],
  templateUrl: './deletar-cliente.component.html',
  styleUrl: './deletar-cliente.component.scss'
})
export class DeletarClienteComponent {
  activeModal = inject(NgbActiveModal)
  cliente!: Cliente

  constructor(private clienteService: ClienteService,private messageService: MessageService) { }

  loadCliente(id: number): void {
    this.clienteService.getCliente(id)
      .subscribe(cliente => {
        this.cliente = cliente
      })
  }

  deletarCliente() {
      this.clienteService.deleteCliente(this.cliente.id)
      .subscribe(cliente => {        
        this.messageService.showSuccess("Cliente deletado com sucesso.")
        this.activeModal.dismiss('Delete success');
      });
  }
}
