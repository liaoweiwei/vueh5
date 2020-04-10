
import Vue from 'vue'
import { formatTime, parseTime } from '@/utils'

Vue.filter('formatDiff', function (value) {
  const date = new Date(value)
  return formatTime(date, '{y}-{m}-{d}')
})

Vue.filter('priceFixed', function (value) {
  const num = Number(value)
  return num.toFixed(2)
})

Vue.filter('formatDiss', function (value) {
  const date = new Date(value).getTime()
  return parseTime(date, '{y}-{m}-{d}')
})