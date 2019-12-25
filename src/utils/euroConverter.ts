const convertEuroToCent = (euros: number) => Number.parseInt((euros * 100).toFixed(0))
const convertCentToEuro = (cents: number) => Number.parseFloat((cents / 100).toFixed(2))

const stringToCurrency = (str: string) => Number.parseFloat(str.replace(',', '.'))

export const euroToCent = (euros: number | string) => {
  if (typeof euros === 'string') {
    return convertEuroToCent(stringToCurrency(euros))
  }
  return convertEuroToCent(euros)
}

export const centToEuro = (cents: number | string) => {
  if (typeof cents === 'string') {
    return convertCentToEuro(stringToCurrency(cents))
  }
  return convertCentToEuro(cents)
}
