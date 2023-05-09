export const formatNumber = (
  number = 0,
  decimals = 2,
  includeDollarSign = false,
  includeSign = true,
  short = false
) => {
  const sign = Math.sign(number)
  const num = parseFloat(Math.abs(number))

  const formattedNumWithDecimals = (num / 1.00).toFixed(decimals)

  if (short) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' }
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = lookup.slice().reverse().find((item) => (num >= item.value))

    if (item) {
      return (num / item.value).toFixed(num > 0 ? decimals : 0).replace(rx, '$1') + item.symbol
    }
  }

  const formattedNum = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals }).format(formattedNumWithDecimals)

  if (includeSign === false) return formattedNum

  if (sign === -1) return `-${includeDollarSign ? '$' : ''}${formattedNum}`
  else if (sign === 1) return `${includeDollarSign ? '$' : ''}${formattedNum}`
  else return `${includeDollarSign ? '$' : ''}${formattedNum}`
}
