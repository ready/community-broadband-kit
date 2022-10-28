/**
 * Formats a number with the given number of decimals
 * @param {*} param0 An object with the number and number of decimals 
 * @returns A formated number
 */
function formatNumber ({
    number = 0,
    decimals = 2
  }) {
    const num = parseFloat(Math.abs(number))
    const formattedNumWithDecimals = (num / 1.00).toFixed(decimals)
    const formattedNum = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals }).format(formattedNumWithDecimals)
    return formattedNum
  }

export { formatNumber }