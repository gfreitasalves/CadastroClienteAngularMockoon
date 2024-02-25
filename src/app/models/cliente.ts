export class Cliente {
  id: number
  nomeCliente: string
  cpf: string
  dataNascimento: Date | null
  rendaMensal: number
  email: string
  dataCadastro: Date | null

  constructor() {
    this.id = 0
    this.nomeCliente = ''
    this.cpf = ''
    this.dataNascimento = null
    this.rendaMensal = 0
    this.email = ''
    this.dataCadastro = null
  }
}


export class ClientePaginado {
  count: number  
  clientes:Cliente[]

  constructor(count:number, clientes: Cliente[]) {
    this.count = count
    this.clientes = clientes
  }
}