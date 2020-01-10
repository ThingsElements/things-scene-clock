/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Text } from '@hatiolab/things-scene'
import moment from 'moment'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'time-format',
      name: 'timeFormat'
    },
    {
      type: 'checkbox',
      label: 'is-local-time',
      name: 'localTime'
    },
    {
      type: 'number',
      label: 'utc',
      name: 'utc'
    },
    {
      type: 'select',
      label: 'week-language',
      name: 'weekLanguage',
      property: {
        options: [
          {
            display: 'English',
            value: 'en'
          },
          {
            display: 'Korean',
            value: 'ko'
          },
          {
            display: 'Chinese',
            value: 'zh_cn'
          },
          {
            display: 'Japanese',
            value: 'ja'
          }
        ]
      }
    }
  ]
}

export default class ClockText extends Text {
  is3dish() {
    return false
  }

  get nature() {
    return NATURE
  }

  render(ctx) {
    super.render(ctx)

    this._raf = requestAnimationFrame(() => {
      setTimeout(() => {
        this._timer()
      }, 1000)
    })
  }

  _timer() {
    this.set('data', this._getTimeStamp())
  }

  _getTimeStamp() {
    var d = moment()

    var utc = this.get('utc')
    var formatStr = this.get('timeFormat') || 'YYYY-MM-DD HH:mm:ss'
    var week_lang = this.get('weekLanguage')
    if (!this.get('weekLanguage')) {
      week_lang = 'en'
    }
    if (this.get('localTime')) {
      d.local()
    } else {
      d.utc().utcOffset(utc)
    }
    var result = d.locale(week_lang).format(formatStr)
    return result
  }

  dispose() {
    super.dispose()
    cancelAnimationFrame(this._raf)
  }
}

Component.register('clock-text', ClockText)
