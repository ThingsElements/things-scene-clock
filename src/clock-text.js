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

export default class ClockText extends scene.Text {

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
    var formatStr = this.get('timeFormat') || 'YYYY-MM-DD kk:mm:ss'

    if(this.get('localTime')) {
      d.local();
    } else {
      d.utc().utcOffset(utc);
    }


    return d.format(formatStr)
  }

}

scene.Component.register('clock-text', ClockText)
