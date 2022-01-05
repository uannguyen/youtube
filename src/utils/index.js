import numeral from 'numeral'
import moment from 'moment'
import 'moment/locale/vi'
import { useAppDispatch } from 'stores/toolkit/hooks'

const searchQuery = (useLocation) => {
  return new URLSearchParams(useLocation.search)
}

const formatNumeral = (value, type = '0.0a') => {
  if (!value) return
  let result = numeral(value).format(type)
  result = result
    .replace('m', ' Tr')
    .replace('k', ' N')
    .replace(/,/g, '.')
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
  formatNumeral,
  searchQuery
}