import moment from 'moment'

// const localeData = moment.updateLocale('en', {
//   relativeTime: {
//     future: "in %s",
//     past: "%s ago",
//     s: 'hello, a few seconds',
//     ss: '%d seconds',
//     m: "a minute",
//     mm: "%d minutes",
//     h: "an hour",
//     hh: "%d hours",
//     d: "a day",
//     dd: "%d days",
//     M: "a month",
//     MM: "%d months",
//     y: "a year",
//     yy: "%d years"
//   }
// });
export const formatDate = (rawDate, type) => {
  const date = moment(rawDate)
  if (!date.isValid()) return ''
  if (type === 'timeStamp') {
    return date.format('MMMM Do YYYY [at] h:mm:ss a')
  } else if (type === 'shortDate') {
    return date.format('DD MMM [\']YY')
  } else if (type === 'longDate') {
    return date.format('MMMM Do YYYY')
  } else if (type === 'relativeDate') {
    // return (date.calendar())
    return moment(rawDate).fromNow()
  }
}
