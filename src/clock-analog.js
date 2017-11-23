/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'hourwidth',
    name: 'hourWidth',
    property: 'hourWidth'
  },{
    type: 'number',
    label: 'minute-width',
    name: 'minuteWidth',
    property: 'minuteWidth'
  },{
    type: 'number',
    label: 'second-width',
    name: 'secondWidth',
    property: 'secondWidth'
  },{
    type: 'checkbox',
    label: 'show-second',
    name: 'showSecond',
    property: 'showSecond'
  },{
    type: 'checkbox',
    label: 'show-number',
    name: 'showNumber',
    property: 'showNumber'
  },{
    type: 'checkbox',
    label: 'fill-interval',
    name: 'fillInterval',
    property: 'fillInterval'
  },{
    type: 'color',
    label: 'fill-interval-color',
    name: 'fillIntervalColor',
    property: 'fillIntervalColor'
  },{
    type: 'color',
    label: 'inner-circle-color',
    name: 'innerCircleColor',
    property: 'innerCircleColor'
  }]
}

function drawHand(ctx, pos, length, rx) {
    ctx.beginPath();
    ctx.lineWidth = rx;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

export default class ClockAnalog extends scene.Ellipse {

  _draw(ctx) {

    var {
      cx, cy, rx, ry,
      fillStyle,
      strokeStyle,
      lineWidth,
      hourWidth,
      minuteWidth,
      secondWidth,
      showSecond = true,
      showNumber = true,
      fillInterval = false,
      fillIntervalColor,
      innerCircleColor = '#FF0000'
    } = this.model;

    // 시계 원 그리기.
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, 0, 2 * Math.PI)
    this.drawFill(ctx)

    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = lineWidth || rx * 0.1;
    ctx.fillStyle = fillStyle

    ctx.stroke();
    ctx.beginPath();
    
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx)


    // 시계 숫자 그리기
    if(showNumber){
      var ang;
      var num;
      ctx.font = rx * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, - rx * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, rx * 0.85);
        ctx.rotate(-ang);
      }
    }
    
    // 시계 침 그리기
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));

    drawHand(ctx, hour, rx * 0.5, hourWidth || rx * 0.07);

    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, rx * 0.8, minuteWidth || rx * 0.07);

    // second
    if(showSecond){
      second = (second * Math.PI / 30);
      drawHand(ctx, second, rx * 0.9, secondWidth || rx * 0.02);
    }

    ctx.scale(1, 1)
    ctx.translate(-cx, -cy);

    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.abs(rx * 0.1), Math.abs(ry * 0.1), 0, 0, 2 * Math.PI)
    ctx.fillStyle = innerCircleColor
    ctx.fill();


    var timeOut

    timeOut = setTimeout(function(self) {
      self.invalidate()
      clearTimeout(timeOut); // 이 함수가 없을 시 Invalidate가 1초에 여러번 그림.
    }, 1000, this)
  }

}

scene.Component.register('clock-analog', ClockAnalog)
