import Vue from "vue";
import StringMask from "string-mask";
import moment$1 from "moment";
import _$1 from "lodash";

const dateFilter = (dateIso) => {
  const format =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : "DD/MM/YYYY";

  if (!dateIso) {
    return "";
  }

  return formatDate(dateIso, format);
};
Vue.filter("date", dateFilter);

const dateTimeFilter = function dateTimeFilter(dateIso) {
  const format =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : "DD/MM/YYYY HH:mm";

  if (!dateIso) {
    return "";
  }

  return formatDate(dateIso, format);
};
Vue.filter("dateTime", dateTimeFilter);

const yearMonthFilter = function yearMonthFilter(dateIso) {
  const format =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : "MM/YYYY";

  if (!dateIso) {
    return "";
  }

  return formatDate(dateIso, format);
};
Vue.filter("yearMonth", yearMonthFilter);

const timeFilter = (dateIso) => {
  const format =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "HH:mm";

  if (!dateIso) {
    return "";
  }

  if (dateIso.length === 8) {
    dateIso = "1970-01-01T" + dateIso;
  }

  return formatDate(dateIso, format);
};
Vue.filter("time", timeFilter);

const secondsToTimeFilter = (seconds) => {
  const concatHyphen =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const toMilliseconds = seconds * 1000;
  let secondsString = toMilliseconds.toString();
  const isNegative = secondsString.includes("-");

  if (isNegative) {
    secondsString = secondsString.split("-")[1];
    const formatted = moment$1.utc(parseInt(secondsString)).format("HH:mm:ss");
    return "".concat(concatHyphen ? "-" : "").concat(formatted);
  }

  return moment$1.utc(parseInt(secondsString)).format("HH:mm:ss");
};
Vue.filter("timeSeconds", secondsToTimeFilter);

const enumFilter = (value, enums) => {
  if (!value) {
    return "";
  }

  const e = _$1.find(enums, {
    value: value,
  });

  if (e?.descricao) {
    return e.descricao;
  } else if (e?.description) {
    return e.description;
  } else if (e?.label) {
    return e.label;
  }

  return "<DESCRIPTION " + value + " NOT FOUND>";
};
Vue.filter("enum", enumFilter);

const moneyFilter = (value) => {
  const decimalPlaces =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (!value) {
    value = 0;
  }

  const isNegative = Number(value) < 0;
  const zeros = Array(decimalPlaces).fill("0").join("");
  const maskMoney = new StringMask("#.##0,".concat(zeros), {
    reverse: true,
  });

  if ((value + "").indexOf(".") !== -1) {
    value = (value + "").replace(".", ","); // completa as casas decimais

    const missingDecimalPlaces =
      decimalPlaces -
      value.substring(value.indexOf(",") + 1, value.length).length;

    if (missingDecimalPlaces > 0) {
      value = ""
        .concat(value)
        .concat(Array(missingDecimalPlaces).fill("0").join(""));
    }

    if (missingDecimalPlaces < 0) {
      value = value.substring(0, value.length + missingDecimalPlaces);
    }
  } else {
    value = "".concat(value, ",").concat(zeros);
  }

  return (isNegative ? "-" : "") + maskMoney.apply(value.replace(/[^\d]/g, ""));
};
Vue.filter("money", moneyFilter);

const truncateFilter = (value, wordwise, max, tail) => {
  if (!value) return "";
  max = parseInt(max, 10);
  if (!max) return value;
  if (value.length <= max) return value;
  value = value.substr(0, max);

  if (wordwise) {
    const lastspace = value.lastIndexOf(" ");

    if (lastspace !== -1) {
      value = value.substr(0, lastspace);
    }
  }

  return value + (tail || " …");
};
Vue.filter("truncate", truncateFilter);

const formatDecimal = (value) => {
  return value + "".replace(/\./g, "").replace(",", ".");
};

const formatDate = (dateIso, format) => {
  const date = moment$1(dateIso).format(format);
  return date !== "Invalid date" ? date : null;
};

export {
  formatDecimal,
  formatDate,
  moneyFilter,
  dateFilter,
  dateTimeFilter,
  enumFilter,
  secondsToTimeFilter,
  timeFilter,
  yearMonthFilter,
  truncateFilter,
};
