import locales from './locales';

var templates = [{
  name: 'Clock Analog', /* 다국어 키 표현을 어떻게.. */
  description: '...', /* 다국어 키 표현을 어떻게.. */
  group: 'etc', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: '../', /* 또는, Object */
  template: {
    type: 'clock analog',
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
        innerCircleColor: '#000000',
    }
  }
}, {
  name: 'Clock Text', /* 다국어 키 표현을 어떻게.. */
  description: '...', /* 다국어 키 표현을 어떻게.. */
  group: 'etc', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: '../', /* 또는, Object */
  template: {
    type: 'clock text',
    model: {
        type: 'clock-text',
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
}];

console.log(templates)

module.exports = {
  locales,
  templates
};
