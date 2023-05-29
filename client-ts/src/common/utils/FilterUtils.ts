// import StringMask from 'string-mask';
import moment from 'moment';
import _ from 'lodash';
import { Enum } from 'src/common/models/Enum';

export default new (class FilterUtils {
  date(dateIso: string): string | null {
    const format =
      dateIso.length > 1 && dateIso[1] != undefined ? dateIso[1] : 'DD/MM/YYYY';

    if (!dateIso) {
      return '';
    }

    return this.formatDate(dateIso, format);
  }

  dateTime(dateIso: string): string | null {
    const format =
      dateIso.length > 1 && dateIso[1] != undefined
        ? dateIso[1]
        : 'DD/MM/YYYY HH:mm';

    if (!dateIso) {
      return '';
    }

    return this.formatDate(dateIso, format);
  }

  yearMonth(dateIso: string): string | null {
    const format =
      dateIso.length > 1 && dateIso[1] != undefined ? dateIso[1] : 'MM/YYYY';

    if (!dateIso) {
      return '';
    }

    return this.formatDate(dateIso, format);
  }

  time(dateIso: string): string | null {
    const format =
      dateIso.length > 1 && dateIso[1] != undefined ? dateIso[1] : 'HH:mm';

    if (!dateIso) {
      return '';
    }

    if (dateIso.length === 8) {
      dateIso = '1970-01-01T' + dateIso;
    }

    return this.formatDate(dateIso, format);
  }

  secondsToTime(seconds: string): string {
    const concatHyphen =
      seconds.length > 1 && seconds[1] != undefined ? seconds[1] : false;
    const toMilliseconds = Number(seconds) * 1000;
    let secondsString = toMilliseconds.toString();
    const isNegative = secondsString.includes('-');

    if (isNegative) {
      secondsString = secondsString.split('-')[1];
      const formatted = moment.utc(parseInt(secondsString)).format('HH:mm:ss');
      return ''.concat(concatHyphen ? '-' : '').concat(formatted);
    }

    return moment.utc(parseInt(secondsString)).format('HH:mm:ss');
  }

  enum(value: string, enums: Enum): string {
    if (!value) {
      return '';
    }

    const e = _.find(enums, value);

    if (e?.description) {
      return e.description;
    } else if (e?.label) {
      return e.label;
    }

    return 'Not found';
  }

  money(value: string): string {
    console.log(value);
    // const decimalPlaces =
    //   value.length > 1 && value[1] !== undefined ? value[1] : 2;
    //
    // if (!value) {
    //   value = '0';
    // }
    //
    // const isNegative = Number(value) < 0;
    // const zeros = Array(decimalPlaces).fill('0').join('');
    // const maskMoney = new StringMask('#.##0,'.concat(zeros), {
    //   reverse: true,
    // });
    //
    // if ((value + '').indexOf('.') !== -1) {
    //   value = (value + '').replace('.', ','); // completa as casas decimais
    //
    //   const missingDecimalPlaces =
    //     Number(decimalPlaces) -
    //     value.substring(value.indexOf(',') + 1, value.length).length;
    //
    //   if (missingDecimalPlaces > 0) {
    //     value = ''
    //       .concat(value)
    //       .concat(Array(missingDecimalPlaces).fill('0').join(''));
    //   }
    //
    //   if (missingDecimalPlaces < 0) {
    //     value = value.substring(0, value.length + missingDecimalPlaces);
    //   }
    // } else {
    //   value = ''.concat(value, ',').concat(zeros);
    // }
    //
    // return (
    //   (isNegative ? '-' : '') + maskMoney.apply(value.replace(/[^\d]/g, ''))
    // );
    return '';
  }

  truncate(value: string, wordwise: string, max: number, tail: string): string {
    if (!value) return '';
    if (!max) return value;
    if (value.length <= max) return value;
    value = value.substr(0, max);

    if (wordwise) {
      const lastspace = value.lastIndexOf(' ');

      if (lastspace !== -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  }

  formatDecimal(value: string): string {
    return value + ''.replace(/\./g, '').replace(',', '.');
  }

  formatDate(dateIso: string, format: string): string | null {
    const date = moment(dateIso).format(format);
    return date !== 'Invalid date' ? date : null;
  }
})();
