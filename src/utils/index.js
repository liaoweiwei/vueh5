// const IntlRelativeFormat = require('intl-relativeformat')
// const rtf = new IntlRelativeFormat(process.env.VUE_APP_LOCALE)

import IntlRelativeTimeFormat from '@formatjs/intl-relativetimeformat';
// locale-data for zh
IntlRelativeTimeFormat.__addLocaleData(
  require('@formatjs/intl-relativetimeformat/dist/locale-data/zh.json')
);
 
// locale-data for zh
IntlRelativeTimeFormat.__addLocaleData(
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en.json')
);
 
const rtf = new IntlRelativeTimeFormat('zh-CN')

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    return value.toString().padStart(2, '0')
  })
  return time_str
}


/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return rtf.format(Math.round(diff), 'second')
  } else if (diff < 3600) {
    return rtf.format(Math.round(-(diff / 60)), 'minute')
  } else if (diff < 3600 * 24) {
    return rtf.format(Math.round(-(diff / 3600)), 'hour')
  } else if (diff < 3600 * 24 * 2) {
    return rtf.format(-1, 'day')
  }

  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '-' +
      d.getDate()
    )
  }
}