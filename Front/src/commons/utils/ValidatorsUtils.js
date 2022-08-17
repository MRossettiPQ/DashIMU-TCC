import Vue from "vue";
import moment$1 from "moment";
import moment from "moment";
import {formatDecimal, moneyFilter} from "./FilterUtils";
import Big from "big.js";

const isCep = cep => {
  if (!cep) {
    return true;
  }

  const cleanNumber = cep.replace(/[^\d]/g, "");
  if (cleanNumber.length !== 8) {
    return "CEP inválido.";
  }

  return true;
};

const isCnpj = s => {
  if (!s) {
    return true;
  }

  s = s.replace(/\D/g, "");
  let i;
  const c = s.substr(0, 12);
  const dv = s.substr(12, 2);
  let d1 = 0;

  for (i = 0; i < 12; i++) {
    d1 += c.charAt(11 - i) * (2 + (i % 8));
  }

  if (d1 === 0) return "CNPJ inválido.";
  d1 = 11 - (d1 % 11);
  if (d1 > 9) d1 = 0;

  if (dv.charAt(0) !== d1) {
    return "CNPJ inválido.";
  }

  d1 *= 2;

  for (i = 0; i < 12; i++) {
    d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
  }

  d1 = 11 - (d1 % 11);
  if (d1 > 9) d1 = 0;

  if (dv.charAt(1) !== d1) {
    return "CNPJ inválido.";
  }

  return true;
};

const isCpf = cpf => {
  if (!cpf) {
    return true;
  }

  let soma;
  let resto;
  let i;
  cpf = cpf.replace(/[^\d]/g, "");

  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return "CPF inválido.";
  }

  soma = 0;

  for (i = 1; i <= 9; i++) {
    soma += Math.floor(cpf.charAt(i - 1)) * (11 - i);
  }

  resto = 11 - (soma - Math.floor(soma / 11) * 11);

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== Math.floor(cpf.charAt(9))) {
    return "CPF inválido.";
  }

  soma = 0;

  for (i = 1; i <= 10; i++) {
    soma += cpf.charAt(i - 1) * (12 - i);
  }

  resto = 11 - (soma - Math.floor(soma / 11) * 11);

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== Math.floor(cpf.charAt(10))) {
    return "CPF inválido.";
  }

  return true;
};

const isCpfOrCnpj = s => {
  if (!s) {
    return true;
  }

  if (s.length <= 14) {
    return isCpf(s);
  }
 else {
    return isCnpj(s);
  }
};

const isDateValidator = format => {
  return function (val) {
    if (!val) {
      return true;
    }

    if (val.length < format.length) {
      return "Data inválida.";
    }

    const date = moment$1(val, format).format("YYYY-MM-DD[T]HH:mm:ss");

    if (date === "Invalid date") {
      return "Data inválida.";
    }

    return true;
  };
};

const isEmail = email => {
  if (!email) {
    return true;
  }

  const msgError = "E-mail inválido";
  const indexOf = email.indexOf("@");

  if (indexOf === -1) {
    return msgError;
  }

  const subEmail = email.substring(indexOf + 1);

  if (!subEmail.length) {
    return msgError;
  }

  return true;
};

const isMaxLengthValidator = maxLength => {
  return function (val) {
    return (
      !val ||
      val.length <= maxLength ||
      "Tamanho máximo de ".concat(maxLength, " excedido.")
    );
  };
};

const isNotBlankIfValidator = condition => {
  return function (val) {
    return (
      !condition ||
      typeof val == "number" ||
      !_.isEmpty(val) ||
      "Preenchimento obrigatório."
    );
  };
};

const isNotBlankValidator = val => {
  return (
    typeof val == "number" || !_.isEmpty(val) || "Preenchimento obrigatório."
  );
};

const isValidRg = rg => {
  if (!rg) {
    return true;
  }

  const valoresRepetidos = /^\b(\d|\w)\1{5,}\b$/g;

  if (valoresRepetidos.test(rg)) {
    return "RG inválido.";
  }

  const valoresCrescentes = /^(01234|12345|23456|34567|45678|56789)$/g;

  if (valoresCrescentes.test(rg)) {
    return "RG inválido.";
  }

  const valoresDecrescente = /^(98765|87654|76543|65432|54321|43210)$/g;

  if (valoresDecrescente.test(rg)) {
    return "RG inválido.";
  }

  const value = rg.replace(/[^a-zA-Z0-9]/g, "");

  if (value.length < 5) {
    return "RG inválido.";
  }
};

const isTelefone = telefone => {
  if (!telefone) {
    return true;
  }

  const cleanNumber = telefone.replace(/[^\d]/g, "");

  if (cleanNumber.length > 11 || cleanNumber.length < 10) {
    return "Telefone inválido.";
  }

  return true;
};

const isMaxValValidator = maxValue => {
  return function (value) {
    maxValue = Big(maxValue);
    value = parseFloat(value);
    const toNumber = Big(value);
    const isValid = toNumber.lte(maxValue);

    if (!isValid) {
      return "O valor deve ser menor ou igual a ".concat(
        moneyFilter(maxValue),
        "."
      );
    }
  };
};

const isMaxMoneyValValidator = maxValue => {
  return function (value) {
    maxValue = Big(maxValue);
    value = reverseFormatNumber(value, "pt-BR");
    const toNumber = Big(value);
    const isValid = toNumber.lte(maxValue);

    if (!isValid) {
      return "O valor deve ser menor ou igual a ".concat(
        moneyFilter(maxValue),
        "."
      );
    }
  };
};

const isDataNascimentoValidator = (value, minAge = 18) => {
  return (
    moment(value, "DD/MM/YYYY").isBefore(moment().subtract(minAge, "years")) ||
    `Deve ser maior de ${minAge} anos.`
  );
};

const isMinValValidator = minValue => {
  return function (value) {
    value = formatDecimal(value);
    const toNumber = parseFloat(value);
    const isNaN = Number.isNaN(toNumber);
    const isValid = !isNaN && toNumber >= minValue;

    if (!isValid) {
      return "O valor deve ser maior ou igual a ".concat(minValue, ".");
    }
  };
};

const isEqual = (equalFor, msg = "As senhas informadas são diferentes") => {
  return function (value) {
    if (equalFor !== value) {
      return msg;
    }
  };
};

const reverseFormatNumber = (val, locale) => {
  const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
  const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
  let reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
  reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
};

const ValidatorPlugin = {
  install: function install(Vue) {
    Vue.prototype.$validators = {
      notBlank: isNotBlankValidator,
      notBlankIf: isNotBlankIfValidator,
      maxLength: isMaxLengthValidator,
      minVal: isMinValValidator,
      maxVal: isMaxValValidator,
      maxMoneyVal: isMaxMoneyValValidator,
      date: isDateValidator,
      dateBorn: isDataNascimentoValidator,
      rg: isValidRg,
      email: isEmail,
      telefone: isTelefone,
      cpfOrCnpj: isCpfOrCnpj,
      cnpj: isCnpj,
      cpf: isCpf,
      cep: isCep,
      equal: isEqual
    };
  }
};

Vue.use(ValidatorPlugin);

export default {
  ValidatorPlugin,
  ValidatorCep: isCep,
  ValidatorCpf: isCpf,
  ValidatorCnpj: isCnpj,
  ValidatorCpfOrCnpj: isCpfOrCnpj,
  ValidatorTelefone: isTelefone,
  ValidatorNotBlank: isNotBlankValidator,
  ValidatorNotBlankIf: isNotBlankIfValidator,
  ValidatorMaxLength: isMaxLengthValidator,
  ValidatorMinVal: isMinValValidator,
  ValidatorMaxVal: isMaxValValidator,
  ValidatorMaxMoneyVal: isMaxMoneyValValidator,
  ValidatorDate: isDateValidator,
  ValidatorDateBorn: isDataNascimentoValidator,
  ValidatorRg: isValidRg,
  ValidatorEmail: isEmail
};
