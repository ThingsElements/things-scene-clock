import analog from './assets/clock-analog.png'
import digital from './assets/clock-digital.png'

var templates = [
  {
    type: 'clock analog',
    description: 'analog style clock',
    group: 'etc' /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */,
    icon: analog,
    model: {
      type: 'clock-analog',
      cx: 150,
      cy: 150,
      rx: 50,
      ry: 50,
      fillStyle: '#ffffff',
      strokeStyle: '#000000',
      lineWidth: 5,
      alpha: 1,
      innerCircleSize: 5,
      innerCircleColor: '#000000'
    }
  },
  {
    type: 'clock text',
    description: 'digital style clock',
    group: 'etc' /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */,
    icon: digital,
    model: {
      type: 'clock-text',
      text: '#{data}',
      top: 100,
      left: 100,
      width: 100,
      height: 50,
      fontColor: '#000000',
      fontSize: 20,
      alpha: 1,
      localTime: true,
      utc: 0,
      timeFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  }
]

export default {
  templates
}
