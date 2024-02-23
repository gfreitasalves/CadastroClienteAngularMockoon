import { Component, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormularioClienteComponent } from '../formulario-cliente/formulario-cliente.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-novo-cliente',
  standalone: true,
  imports: [FormularioClienteComponent],
  templateUrl: './novo-cliente.component.html',
  styleUrl: './novo-cliente.component.css'
})
export class NovoClienteComponent {
  activeModal = inject(NgbActiveModal)
  cliente: Cliente = new Cliente()
  constructor(private clienteService: ClienteService, private messageService: MessageService) { }

  updateClient(cliente: Cliente) {
    this.cliente = cliente;
  }

  salvar() {
    this.clienteService.addCliente(this.cliente)
      .subscribe(cliente => {
        this.messageService.showSuccess("Cliente '" + this.cliente.nomeCliente + "' criado com sucesso.")
        this.activeModal.dismiss('Create success')
      });
  }
}
