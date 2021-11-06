import numeral from 'numeral'
import moment from 'moment'
import 'moment/locale/vi'

const formatNumeral = (value, type = '0.0a') => {
  if (!value) return
  let result = numeral(value).format(type)
  result = result.replace('m', ' Tr').replace('k', ' N')
  return result
}

const formatMoment = (value, type) => {
  if (!value) return
  switch (type) {
    case 'duration':
      const seconds = moment.duration(value).asSeconds()
      const _duration = moment.utc(seconds * 1000).format('mm:ss')
      return _duration
    default:
      return moment(value).fromNow()
  }
  
}

export {
  formatMoment,
  formatNumeral
}