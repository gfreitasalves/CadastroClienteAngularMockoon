import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  static nomeComSobrenome(controle: AbstractControl) {
    const nome = controle.value;

    let valido: boolean = true;

    const regex = new RegExp('^(?![\s.]+$)[a-zA-Z\s.]*$');

    if (regex.test(nome)) {

      valido = false;
    }

    if (valido) return null;

    return { nomeInvalido: true, mensagem: "Nome inválido, sem sobrenome." };
  }

  static intervaloIdadeEntre18e60(controle: AbstractControl) {
    const dataNasciemnto = controle.value;

    var today = new Date();
    var birthDate = new Date(dataNasciemnto);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return { idadeInvalida: true, mensagem: "Idade inválida, menor que 18 anos." };
    } else if (age > 60) {
      return { idadeInvalida: true, mensagem: "Idade inválida, maior que 60 anos." };
    }

    return null;
  }

  static cpfValido(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
      valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true, mensagem: "CPF inválido." };
  }
}
