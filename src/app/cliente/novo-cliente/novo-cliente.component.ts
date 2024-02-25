import { Component, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { CustomValidatorService } from '../../services/custom-validator.service';

@Component({
  selector: 'app-novo-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './novo-cliente.component.html',
  styleUrl: './novo-cliente.component.scss'
})
export class NovoClienteComponent {
  activeModal = inject(NgbActiveModal)
  cliente: Cliente = new Cliente()
  formCliente!: FormGroup
  submitted = false;
  constructor(private clienteService: ClienteService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm()
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
      cpf: [this.cliente.cpf,
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
    this.submitted = true
    if (this.formCliente?.valid) {
      this.clienteService.addCliente(this.formCliente.value)
        .subscribe(cliente => {
          this.messageService.showSuccess("Cliente criado com sucesso.")
          this.activeModal.dismiss('Create success')
        });
    }
    console.log(this.formCliente.controls['dataNascimento'].errors)
  }
}
