const red = '\x1b[31m'
const green = '\x1b[32m'
const blue = '\x1b[34m'
const reset = '\x1b[0m'

const error = (message: string, err?: object) => {
  console.log(red, `ERROR: ${message}`, reset)
  if (err) {
    console.log(err)
  }
}

const success = (message: string) => {
  console.log(green, 'SUCCESS', reset, message)
}

const info = (message: string) => {
  console.log(blue, 'INFO', reset, message)
}

export default { error, success, info }
