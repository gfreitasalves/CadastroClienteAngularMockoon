import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.css'
})
export class FormularioClienteComponent {
  @Input({ required: false }) cliente!: Cliente  
  @Output() clienteAtualizadoEvent:EventEmitter<Cliente> = new EventEmitter<Cliente>();

  formCliente!: FormGroup

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {    
    this.formCliente = this.formBuilder.group({
      id:[this.cliente.id],
      nomeCliente: [this.cliente.nomeCliente],
      cpf: [this.cliente.cpf],
      dataNascimento: [this.cliente.dataNascimento],
      rendaMensal: [this.cliente.rendaMensal],
      email: [this.cliente.email],
      dataCadastro: [this.cliente.dataCadastro]
    })

    this.formCliente.valueChanges.subscribe(x=>{      
      this.clienteAtualizadoEvent.emit(this.formCliente.value)
    })
  }


}
