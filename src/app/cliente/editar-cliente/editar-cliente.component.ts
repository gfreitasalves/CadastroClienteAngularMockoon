import { Component, Input, inject } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorService } from '../../services/custom-validator.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent {
  activeModal = inject(NgbActiveModal)
  cliente: Cliente = new Cliente()
  formCliente!: FormGroup
  submitted = false;

  constructor(private clienteService: ClienteService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm()
  }

  loadCliente(id: number): void {
    this.clienteService.getCliente(id)
      .subscribe(cliente => {
        this.cliente = cliente

        this.loadForm()
      })
  }

  private loadForm() {
    this.formCliente = this.formBuilder.group({
      id: [this.cliente.id],
      nomeCliente: [this.cliente.nomeCliente,
      [
        Validators.required,
        CustomValidatorService.nomeComSobrenome
      ]
      ],
      cpf: [{ value: this.cliente.cpf, disabled: true },
      [
        Validators.required,
        CustomValidatorService.cpfValido
      ]],
      dataNascimento: [this.cliente.dataNascimento,
      [
        Validators.required,
        CustomValidatorService.intervaloIdadeEntre18e60
      ]
      ],
      rendaMensal: [this.cliente.rendaMensal, Validators.required],
      email: [this.cliente.email],
      dataCadastro: [this.cliente.dataCadastro]
    })
  }

  onSubmit() {
    if (this.formCliente?.valid) {
      this.clienteService.updateCliente(this.formCliente.value)
        .subscribe(cliente => {
          this.messageService.showSuccess("Cliente atualizado com sucesso.")
          this.activeModal.dismiss('Save success');
        });
    }

  }
}
