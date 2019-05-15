/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Text } from "@hatiolab/things-scene";
import moment from "moment";

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: "string",
      label: "time-format",
      name: "timeFormat"
    },
    {
      type: "checkbox",
      label: "is-local-time",
      name: "localTime"
    },
    {
      type: "number",
      label: "utc",
      name: "utc"
    },
    {
      type: "select",
      label: "week-language",
      name: "weekLanguage",
      property: {
        options: [
          {
            display: "English",
            value: "en"
          },
          {
            display: "Korean",
            value: "ko"
          },
          {
            display: "Chinese",
            value: "zh_cn"
          },
          {
            display: "Japanese",
            value: "ja"
          }
        ]
      }
    }
  ]
};

export default class ClockText extends Text {
  get nature() {
    return NATURE;
  }

  _draw(ctx) {
    setTimeout(this._timer.bind(this), 1000);
  }

  _timer() {
    this.set({
      text: this._getTimeStamp()
    });
  }

  _getTimeStamp() {
    var d = moment();

    var utc = this.get("utc");
    var formatStr = this.get("timeFormat") || "YYYY-MM-DD HH:mm:ss";
    var week_lang = this.get("weekLanguage");
    if (!this.get("weekLanguage")) {
      week_lang = "en";
    }
    if (this.get("localTime")) {
      d.local();
    } else {
      d.utc().utcOffset(utc);
    }
    return d.locale(week_lang).format(formatStr);
  }
}

Component.register("clock-text", ClockText);
