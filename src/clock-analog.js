/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Ellipse } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'number',
      label: 'hour-width',
      name: 'hourWidth',
      property: 'hourWidth'
    },
    {
      type: 'number',
      label: 'minute-width',
      name: 'minuteWidth',
      property: 'minuteWidth'
    },
    {
      type: 'number',
      label: 'second-width',
      name: 'secondWidth',
      property: 'secondWidth'
    },
    {
      type: 'checkbox',
      label: 'needle-round',
      name: 'needleRound',
      property: 'needleRound'
    },
    {
      type: 'checkbox',
      label: 'show-second',
      name: 'showSecond',
      property: 'showSecond'
    },
    {
      type: 'checkbox',
      label: 'show-number',
      name: 'showNumber',
      property: 'showNumber'
    },
    {
      type: 'number',
      label: 'inner-circle-size',
      name: 'innerCircleSize',
      property: 'innerCircleSize'
    },
    {
      type: 'color',
      label: 'inner-circle-color',
      name: 'innerCircleColor',
      property: 'innerCircleColor'
    }
  ]
}

function drawHand(ctx, pos, length, rx, needleRound) {
  ctx.beginPath()
  ctx.lineWidth = rx
  ctx.lineCap = needleRound ? 'round' : 'square'
  ctx.moveTo(0, 0)
  ctx.rotate(pos)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-pos)
}

export default class ClockAnalog extends Ellipse {
  is3dish() {
    return false
  }

  _draw(ctx) {
    var {
      cx,
      cy,
      rx,
      ry,
      fillStyle,
      strokeStyle,
      fontColor = '#000',
      lineWidth,
      hourWidth,
      minuteWidth,
      secondWidth,
      needleRound = false,
      showSecond = true,
      showNumber = true,
      innerCircleSize = 5,
      innerCircleColor = '#000'
    } = this.model

    // 시계 원 그리기.
    ctx.beginPath()
    ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, 0, 2 * Math.PI)

    ctx.fillStyle = fillStyle

    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = lineWidth || rx * 0.1
    this.drawFill(ctx)
    this.drawStroke(ctx)

    ctx.beginPath()
    ctx.translate(cx, cy)
    ctx.scale(1, ry / rx)

    // 시계 숫자 그리기
    if (showNumber) {
      var ang
      var num
      ctx.font = rx * 0.15 + 'px arial'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillStyle = fontColor

      for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6
        ctx.rotate(ang)
        ctx.translate(0, -rx * 0.85)
        ctx.rotate(-ang)
        ctx.fillText(num.toString(), 0, 0)
        ctx.rotate(ang)
        ctx.translate(0, rx * 0.85)
        ctx.rotate(-ang)
      }
    }

    // 시계 침 그리기
    var now = new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()

    // hour needle
    hour = hour % 12
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60)

    drawHand(ctx, hour, rx * 0.55, hourWidth || rx * 0.07, needleRound)

    // minute needle
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60)
    drawHand(ctx, minute, rx * 0.8, minuteWidth || rx * 0.07, needleRound)

    // second needle
    if (showSecond) {
      second = (second * Math.PI) / 30
      drawHand(ctx, second, rx * 0.9, secondWidth || rx * 0.02, needleRound)
    }

    ctx.beginPath()

    // Inner Circle
    if (innerCircleSize) {
      ctx.ellipse(0, 0, innerCircleSize, innerCircleSize, 0, 0, 2 * Math.PI)
      ctx.fillStyle = innerCircleColor
      ctx.fill()
    }

    ctx.beginPath()

    ctx.scale(1, rx / ry)
    ctx.translate(-cx, -cy)

    var timeOut
    timeOut = setTimeout(
      function(self) {
        self.invalidate()
        clearTimeout(timeOut) // 이 함수가 없을 시 Invalidate가 1초에 여러번 그림.
      },
      1000,
      this
    )
  }

  get nature() {
    return NATURE
  }
}

Component.register('clock-analog', ClockAnalog)
