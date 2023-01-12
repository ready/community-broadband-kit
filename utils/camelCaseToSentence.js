export default function camelCaseToSentence (text, caps = true) {
  if (['mrr', 'ltv'].includes(text)) return text.toUpperCase()
  if (typeof text !== 'string') return text.join(', ')

  // remove quotes
  const noQuotes = text.replace(/"/g, '')
  // remove dot and capitalize next letter
  const noDot = noQuotes.replace(/(?:\.)(\w)/g, (m, p1) => {
    let str = ' '
    if (caps) str += p1.toUpperCase()
    else str += p1
    return str
  })
  // add space in between CamelCase
  const result = noDot.replace(/(?:[a-z])([A-Z])/g, (m, $1) => m[0] + ' ' + $1)

  if (!caps) return result.toLowerCase()

  // capitalize first letter
  const sentence = result.charAt(0).toUpperCase() + result.slice(1)

  return sentence
}
