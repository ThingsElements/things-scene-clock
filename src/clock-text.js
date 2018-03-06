/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

 import { Component, Text } from '@hatiolab/things-scene'
 import moment from 'moment';

 const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'time-format',
    name: 'timeFormat'
  }, {
    type: 'checkbox',
    label: 'is-local-time',
    name: 'localTime'
  }, {
    type: 'number',
    label: 'utc',
    name: 'utc'
  }]
}

export default class ClockText extends Text {

  get nature() {
    return NATURE
  }

  _draw(ctx) {
    setTimeout(this._timer.bind(this), 1000)
  }

  _timer() {
    this.set({
      text: this._getTimeStamp()
    })
  }

  _getTimeStamp() {
    var d = moment();
    var utc = this.get('utc')
    var formatStr = this.get('timeFormat') || 'YYYY-MM-DD HH:mm:ss'

    if(this.get('localTime')) {
      d.local();
    } else {
      d.utc().utcOffset(utc);
    }


    return d.format(formatStr)
  }

}

Component.register('clock-text', ClockText)
