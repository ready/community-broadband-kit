import formatNumber from './formatNumber'

export default function formatValue (value, valueType) {
  switch (valueType) {
    case 'percent':
      return value === 0
        ? (
          <>
            0<span className={styles.percent}>%</span>
          </>
          )
        : (
          <>
            <span>{formatNumber(value, 1, false, false)}</span>
            <span className={styles.percent}>%</span>
          </>
          )
    case 'dollar':
      return `$${formatNumber(value, 2, true, false)}`
    case 'internetper':
      return 100 - value === 0
        ? (
          <>
            0<span className={styles.percent}>%</span>
          </>
          )
        : (
          <>
            <span>{formatNumber(value, 1, false, false)}</span>
            <span className={styles.percent}>%</span>
          </>
          )
    case 'demandpoint':
      return `${value === 0 ? 0 : formatNumber(value, 0, false, false)}`
    case 'default':
      return formatNumber(value, 0, false, false)
    default:
  }
}
