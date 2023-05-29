import moment from 'moment';
import _ from 'lodash';
import FilterUtils from './FilterUtils';
import Big from 'big.js';

class ValidatorsUtils {
  cep(cep: string): boolean | string {
    if (!cep) {
      return true;
    }

    const cleanNumber = cep.replace(/\D/g, '');
    if (cleanNumber.length !== 8) {
      return 'CEP inválido.';
    }

    return true;
  }

  cnpj(s: string): boolean | string {
    if (!s) {
      return true;
    }

    // s = s.replace(/\D/g, '');
    // if (!s.length) {
    //   return;
    // }
    // let i;
    // const c: string = s.substr(0, 12);
    // const dv: string = s.substr(12, 2);
    // let d1 = 0;
    //
    // for (i = 0; i < 12; i++) {
    //   d1 += c.charAt(11 - i) * (2 + (i % 8));
    // }
    //
    // if (d1 === 0) return 'CNPJ inválido.';
    // d1 = 11 - (d1 % 11);
    // if (d1 > 9) d1 = 0;
    //
    // if (dv.charAt(0) !== d1.toString()) {
    //   return 'CNPJ inválido.';
    // }
    //
    // d1 *= 2;
    //
    // for (i = 0; i < 12; i++) {
    //   d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
    // }
    //
    // d1 = 11 - (d1 % 11);
    // if (d1 > 9) d1 = 0;
    //
    // if (dv.charAt(1) !== d1.toString()) {
    //   return 'CNPJ inválido.';
    // }

    return true;
  }

  cpf(cpf: string): boolean | string {
    if (!cpf) {
      return true;
    }

    // let soma;
    // let resto;
    // let i;
    // cpf = cpf.replace(/\D/g, '');
    //
    // if (
    //   cpf.length !== 11 ||
    //   cpf === '00000000000' ||
    //   cpf === '11111111111' ||
    //   cpf === '22222222222' ||
    //   cpf === '33333333333' ||
    //   cpf === '44444444444' ||
    //   cpf === '55555555555' ||
    //   cpf === '66666666666' ||
    //   cpf === '77777777777' ||
    //   cpf === '88888888888' ||
    //   cpf === '99999999999'
    // ) {
    //   return 'CPF inválido.';
    // }
    //
    // soma = 0;

    // for (i = 1; i <= 9; i++) {
    //   soma += Math.floor(cpf?.charAt(i - 1)) * (11 - i);
    // }
    //
    // resto = 11 - (soma - Math.floor(soma / 11) * 11);
    //
    // if (resto === 10 || resto === 11) {
    //   resto = 0;
    // }
    //
    // if (resto !== Math.floor(cpf.charAt(9))) {
    //   return 'CPF inválido.';
    // }
    //
    // soma = 0;
    //
    // for (i = 1; i <= 10; i++) {
    //   soma += cpf.charAt(i - 1) * (12 - i);
    // }
    //
    // resto = 11 - (soma - Math.floor(soma / 11) * 11);
    //
    // if (resto === 10 || resto === 11) {
    //   resto = 0;
    // }
    //
    // if (resto !== Math.floor(cpf.charAt(10))) {
    //   return 'CPF inválido.';
    // }

    return true;
  }

  cpfOrCnpj(s: string): boolean | string {
    if (!s) {
      return true;
    }

    if (s.length <= 14) {
      return this.cpf(s);
    } else {
      return this.cnpj(s);
    }
  }

  email(email: string): boolean | string {
    if (!email) {
      return true;
    }

    const msgError = 'E-mail inválido';
    const indexOf = email.indexOf('@');

    if (indexOf === -1) {
      return msgError;
    }

    const subEmail = email.substring(indexOf + 1);

    if (!subEmail.length) {
      return msgError;
    }

    return true;
  }

  notBlank(val: unknown): boolean | string {
    if (typeof val == 'number' || !_.isEmpty(val)) {
      return true;
    }
    return 'Preenchimento obrigatório.';
  }

  rg(rg: string): boolean | string {
    if (!rg) {
      return true;
    }

    const valoresRepetidos = /^\b(\d|\w)\1{5,}\b$/g;
    if (valoresRepetidos.test(rg)) {
      return 'RG inválido.';
    }

    const valoresCrescentes = /^(01234|12345|23456|34567|45678|56789)$/g;
    if (valoresCrescentes.test(rg)) {
      return 'RG inválido.';
    }

    const valoresDecrescente = /^(98765|87654|76543|65432|54321|43210)$/g;
    if (valoresDecrescente.test(rg)) {
      return 'RG inválido.';
    }

    const value = rg.replace(/[^a-zA-Z0-9]/g, '');
    if (value.length < 5) {
      return 'RG inválido.';
    }

    return true;
  }

  phone(telefone: string): boolean | string {
    if (!telefone) {
      return true;
    }

    const cleanNumber = telefone.replace(/\D/g, '');

    if (cleanNumber.length > 11 || cleanNumber.length < 10) {
      return 'Telefone inválido.';
    }

    return true;
  }

  dateBorn(value: string, minAge = 18): boolean | string {
    return (
      moment(value, 'YYYY/DD/MM').isBefore(
        moment().subtract(minAge, 'years')
      ) || `Deve ser maior de ${minAge} anos.`
    );
  }

  date(format: string): (params: string) => boolean | string {
    return function date(val: string): boolean | string {
      if (!val) {
        return true;
      }

      if (val.length < format.length) {
        return 'Data inválida.';
      }

      const date = moment(val, format).format('YYYY-MM-DD[T]HH:mm:ss');

      if (date === 'Invalid date') {
        return 'Data inválida.';
      }

      return true;
    };
  }

  maxLength(maxLength: number): (params: unknown[]) => boolean | string {
    return function (val: unknown[]): boolean | string {
      return (
        !val ||
        val.length <= maxLength ||
        `Tamanho máximo de ${maxLength} excedido.`
      );
    };
  }

  notBlankIf(condition: boolean): (params: boolean) => boolean | string {
    return function (val: unknown): boolean | string {
      return (
        !condition ||
        typeof val == 'number' ||
        !_.isEmpty(val) ||
        'Preenchimento obrigatório.'
      );
    };
  }

  maxVal(maxValue: string): (params: string) => boolean | string {
    return function (value: string): boolean | string {
      const mxValue = Big(maxValue);
      const nValue = parseFloat(value);
      const toNumber = Big(nValue);
      const isValid = toNumber.lte(mxValue);

      return !isValid
        ? 'O valor deve ser menor ou igual a '.concat(
            FilterUtils.money(maxValue),
            '.'
          )
        : true;
    };
  }

  maxMoneyVal(maxValue: string): (params: string) => boolean | string {
    const format = this.reverseFormatNumber;
    return function (value: string): boolean | string {
      const mxValue = Big(maxValue);
      const nValue = format(value, 'pt-BR');
      const toNumber = Big(nValue);
      const isValid = toNumber.lte(mxValue);

      return !isValid
        ? 'O valor deve ser menor ou igual a '.concat(
            FilterUtils.money(mxValue.toString()),
            '.'
          )
        : true;
    };
  }

  minVal(minValue: string): (params: string) => boolean | string {
    return function minVal(value: string): boolean | string {
      value = FilterUtils.formatDecimal(value);
      minValue = FilterUtils.formatDecimal(minValue);
      const toNumber: number = parseFloat(value);
      const isNaN = Number.isNaN(toNumber);
      const isValid = !isNaN && toNumber >= Number(minValue);

      return !isValid ? `O valor deve ser maior ou igual a ${minValue}.` : true;
    };
  }

  equal(
    equalFor: unknown,
    msg = 'As senhas informadas são diferentes'
  ): (params: unknown) => boolean | string {
    return function equal(value: unknown): boolean | string {
      return !_.isEqual(value, equalFor) ? msg : true;
    };
  }

  reverseFormatNumber(val: string, locale: string): number | string {
    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    let reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  }
}

export { ValidatorsUtils };
