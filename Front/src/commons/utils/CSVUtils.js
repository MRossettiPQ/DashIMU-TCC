import { exportFile } from "quasar";
import moment from "moment/moment";
import Vue from "vue";

const { $q } = Vue.prototype;

const ExportCSV = (table, tableColumns) => {
  function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;
    formatted =
      formatted === void 0 || formatted === null ? "" : String(formatted);
    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')
    return `"${formatted}"`;
  }

  // native encoding to csv format
  const content = [tableColumns.map((col) => wrapCsvValue(col.label))]
    .concat(
      table.map((row) =>
        tableColumns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.field : col.field],
              col.format
            )
          )
          .join(",")
      )
    )
    .join("\r\n");
  const status = exportFile(
    this.patient.name +
    "_" +
    this.label.replace(/\s/g, "") +
    "_" +
    moment.now() +
    ".csv",
    content,
    "text/csv"
  );

  if (status !== true) {
    $q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
};

export default {
  ExportCSV,
};
