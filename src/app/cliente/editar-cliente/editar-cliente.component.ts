import { Component, Input, inject } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioClienteComponent } from '../formulario-cliente/formulario-cliente.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [FormularioClienteComponent],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent {
  activeModal = inject(NgbActiveModal)
  cliente!: Cliente

  constructor(private clienteService: ClienteService,private messageService: MessageService) { }

  loadCliente(id: number): void {
    this.clienteService.getCliente(id)
      .subscribe(cliente => {
        this.cliente = cliente
      })
  }

  updateClient(cliente: Cliente) {    
    this.cliente = cliente;
  }

  salvar() {
    this.clienteService.updateCliente(this.cliente)
      .subscribe(cliente => {        
        this.messageService.showSuccess("Cliente atualizado com sucesso.")
        this.activeModal.dismiss('Save success');
      });
  }
}
