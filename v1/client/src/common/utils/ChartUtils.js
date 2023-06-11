import { init } from 'echarts'
import { throttle } from 'quasar'
import _ from 'lodash'
import { BlobDownloader } from 'src/common/utils/CSVUtils'

class ChartUtils {
  // reference -> https://echarts.apache.org/
  defaultOptions = {
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
        // dataView: { readOnly: true },
        // magicType: { type: ['line', 'bar'] },
      },
    },
    grid: {
      left: '5%',
      top: '7%',
      right: '2%',
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
  }
  options = {}

  chart
  tableColumns
  loaded = false

  constructor(tableColumns) {
    if (tableColumns) {
      this.tableColumns = tableColumns
    }
  }

  setChart(container) {
    this.chart = init(container, 'infographic', {
      renderer: 'svg',
    })
    this.loaded = true
  }

  async exportSvg() {
    try {
      const svg = this.chart.renderToSVGString()
      const blob = new BlobDownloader()
      blob.download(svg, 'test', { type: 'image/svg+xml;' })
      console.log(svg)
    } catch (e) {
      console.log(e)
    }
  }

  updateChart = throttle(() => {
    this.chart.setOption(this.options)
  }, 500)

  getColumnData(array, column) {
    return _.map(array, column)
  }

  setData(sensors, allowedColumn = ['Roll', 'Pitch', 'Yaw'], smooth = false) {
    const series = []
    for (const sensor of sensors) {
      if (sensor.gyro_measurements) {
        for (const col of allowedColumn) {
          const name = `${sensor.sensorName}-${col}`
          const data = this.getColumnData(sensor.gyro_measurements, col)
          const serie = {
            name,
            type: 'line',
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#' + parseInt(String(Math.random() * 0xffffff)).toString(16),
            },
            smooth,
          }
          serie.data = data
          series.push(serie)
        }
      }
    }
    const options = {
      series,
    }
    this.options = _.merge(this.options, this.defaultOptions)
    this.options = _.merge(this.options, options)
    // this.updateChart();

    this.chart.setOption(this.options)
  }

  resize = throttle(() => this.chart?.resize(), 50)
}

class GenericChartUtils {
  // reference -> https://echarts.apache.org/
  defaultOptions = {
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
        // dataView: { readOnly: true },
        // magicType: { type: ['line', 'bar'] },
      },
    },
    grid: {
      left: '5%',
      top: '7%',
      right: '2%',
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
  }
  options = {}

  chart
  tableColumns
  loaded = false

  constructor(tableColumns) {
    if (tableColumns) {
      this.tableColumns = tableColumns
    }
  }

  setChart(container) {
    this.chart = init(container, 'infographic', {
      renderer: 'svg',
    })
    this.loaded = true
  }

  async exportSvg() {
    try {
      const svg = this.chart.renderToSVGString()
      const blob = new BlobDownloader()
      blob.download(svg, 'test', { type: 'image/svg+xml;' })
      console.log(svg)
    } catch (e) {
      console.log(e)
    }
  }

  updateChart = throttle(() => {
    this.chart.setOption(this.options)
  }, 500)

  setData(dataSet = [], dataName = 'Data', smooth = false) {
    const series = []
    if (dataSet.length) {
      const serie = {
        name: dataName,
        type: 'line',
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          color: '#' + parseInt(String(Math.random() * 0xffffff)).toString(16),
        },
        smooth,
      }
      serie.data = dataSet
      series.push(serie)
    }
    const options = {
      series,
    }
    this.options = _.merge(this.options, this.defaultOptions)
    this.options = _.merge(this.options, options)
    this.chart.setOption(this.options)
  }

  resize = throttle(() => this.chart?.resize(), 50)
}

export { ChartUtils, GenericChartUtils }
