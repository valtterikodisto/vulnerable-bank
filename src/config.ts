const getPort = () => process.env.PORT || ''

export const PORT = Number.parseInt(getPort()) || 3000
