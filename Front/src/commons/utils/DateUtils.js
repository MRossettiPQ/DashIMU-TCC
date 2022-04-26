import moment from "moment";

class DateUtils {
  static ISO_DATETIME_FORMAT = "YYYY-MM-DD[T]HH:mm:ss";
  static ISO_DATE_FORMAT = "YYYY-MM-DD";
  static ISO_TIME_FORMAT = "HH:mm:ss";

  static DATETIME_FORMAT = "DD/MM/YYYY HH:mm";
  static DATETIME_SECONDS_FORMAT = "DD/MM/YYYY HH:mm:ss";
  static DATE_FORMAT = "DD/MM/YYYY";
  static TIME_FORMAT = "HH:mm";

  static nowIso() {
    return DateUtils.getDateTimeISOFormated();
  }

  static now() {
    return DateUtils.getDateTimeFormated();
  }

  static getDateTimeISOFormated(dateTime) {
    return moment(dateTime).format(DateUtils.ISO_DATETIME_FORMAT);
  }

  static getDateISOFormated(date) {
    return moment(date).format(DateUtils.ISO_DATE_FORMAT);
  }

  static getTimeISOFormated(time) {
    return moment(time).format(DateUtils.ISO_TIME_FORMAT);
  }

  static getDateTimeFormated(dateTime) {
    return moment(dateTime).format(DateUtils.DATETIME_FORMAT);
  }

  static getDateTimeSecondsFormated(dateTime) {
    return moment(dateTime).format(DateUtils.DATETIME_SECONDS_FORMAT);
  }

  static getDateFormated(date) {
    return moment(date).format(DateUtils.DATE_FORMAT);
  }

  static getTimeFormated(time) {
    return moment(time).format(DateUtils.TIME_FORMAT);
  }
}

export default DateUtils;
