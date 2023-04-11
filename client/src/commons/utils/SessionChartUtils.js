class Chart {
  // reference -> https://echarts.apache.org/
  constructor(dataId, charDataId, charDataValuesKey, charDataNameKey, columns) {
    this.dataId = dataId;
    this.charDataId = charDataId;
    this.charDataValuesKey = charDataValuesKey;
    this.charDataNameKey = charDataNameKey;
    this.columns = columns;

    this.chartData = [];

    this.setedOption = {
      series: [],
    };
    this.defaultOptions = {
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {},
          dataView: { readOnly: true },
          magicType: { type: ["line", "bar"] },
        },
      },
      tooltip: {
        order: "valueDesc",
        trigger: "axis",
      },
      yAxis: {
        boundaryGap: [0, "100%"],
        type: "value",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
    };
  }

  getColumn(array, column) {
    return array.map((obj) => obj[`${column}`]);
  }

  getIndexChartData(check) {
    return this.chartData?.findIndex((cd) => cd[this.charDataId] === check);
  }

  set(data) {
    this.chartData = data;
    // reference -> https://echarts.apache.org/
    if (this.chartData?.length) {
      this.chartData.map((d) => {
        this.columns.forEach((c) => {
          const data = this.getColumn(d[this.charDataValuesKey], c);
          this.setedOption.series.push({
            idSerie: d[this.dataId],
            colName: d[this.charDataValuesKey],
            name: `${d[this.charDataNameKey]} - ${c}`,
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#" + parseInt(Math.random() * 0xffffff).toString(16),
            },
            data,
          });
        });
      });
    }
    return {
      ...this.defaultOptions,
      ...this.setedOption,
    };
  }

  getUpdateOptions(data) {
    this.chartData = data;
    if (this.setedOption?.series?.length) {
      this.setedOption?.series?.forEach((s, index) => {
        const indexChartData = this.getIndexChartData(s.idSerie);
        if (indexChartData !== -1) {
          this.setedOption.series[index].data = this.getColumn(
            this.chartData[indexChartData],
            s.colName
          );
        }
      });
    }
    return this.setedOption;
  }
}

export class SessionChartUtils {
  static create({
    dataId,
    charDataId,
    charDataValuesKey,
    charDataNameKey,
    columns,
  } = {}) {
    return new Chart(
      dataId,
      charDataId,
      charDataValuesKey,
      charDataNameKey,
      columns
    );
  }
}
