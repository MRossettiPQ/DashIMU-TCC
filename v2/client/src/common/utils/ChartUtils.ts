import { EChartsOption, EChartsType, init, SeriesOption } from 'echarts';
import { GyroMeasurement } from 'src/common/models/GyroMeasurement';
import { throttle } from 'quasar';
import _ from 'lodash';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';
import { BlobDownloader } from 'src/common/utils/CSVUtils';

// eslint-disable-next-line @typescript-eslint/ban-types
type T = Function;

export interface ColumnOption {
  name: string;
  label: string;
  field?: string | T;
  required?: boolean;
  align?: string;
  sortable?: boolean;
  sort?: T;
  sortOrder?: 'ad' | 'da';
  format?: T;
  style?: string | T;
  classes?: string | T;
  headerStyle?: string;
  headerClasses?: string;
}

class ChartUtils {
  // reference -> https://echarts.apache.org/
  defaultOptions: EChartsOption = {
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
        // dataView: { readOnly: true },
        // magicType: { type: ['line', 'bar'] },
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: { onZero: true },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
  };
  options: EChartsOption = {};

  chart!: EChartsType;
  tableColumns!: ColumnOption[];
  loaded = false;

  constructor(tableColumns?: ColumnOption[]) {
    if (tableColumns) {
      this.tableColumns = tableColumns;
    }
  }

  setChart(container: HTMLElement) {
    this.chart = init(container, 'infographic', {
      renderer: 'svg',
    });
    this.loaded = true;
  }

  async exportSvg() {
    try {
      const svg = this.chart.renderToSVGString();
      const blob = new BlobDownloader();
      blob.download(svg, 'test', { type: 'image/svg+xml;' });
      console.log(svg);
    } catch (e) {
      console.log(e);
    }
  }

  updateChart = throttle(() => {
    this.chart.setOption(this.options);
  }, 500);

  getColumnData(array: GyroMeasurement[], column: string): number[] {
    return _.map(array, column);
  }

  public setData(
    sensors: SensorUtil[],
    allowedColumn: string[] = [
      'Roll',
      'Pitch',
      'Yaw',
      // 'Quaternion_W',
      // 'Quaternion_X',
      // 'Quaternion_Y',
      // 'Quaternion_Z',
    ],
    smooth = false
  ) {
    const series: SeriesOption[] = [];
    for (const sensor of sensors) {
      if (sensor.gyro_measurements) {
        for (const col of allowedColumn) {
          const name = `${sensor.ip}-${col}`;
          const data = this.getColumnData(sensor.gyro_measurements, col);
          const serie: SeriesOption = {
            name,
            type: 'line',
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color:
                '#' + parseInt(String(Math.random() * 0xffffff)).toString(16),
            },
            smooth,
          };
          serie.data = data;
          series.push(serie);
        }
      }
    }
    const options: EChartsOption = {
      series,
    };
    this.options = _.merge(this.options, this.defaultOptions);
    this.options = _.merge(this.options, options);
    // this.updateChart();

    this.chart.setOption(this.options);
  }

  resize = throttle(() => this.chart?.resize(), 50);
}

export { ChartUtils };
