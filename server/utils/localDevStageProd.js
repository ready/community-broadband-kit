function localDevStageProd ({ local, dev, stage, prod }) {
  const env = process.env.ENVIORNMENT
  let result = local

  if (!env) {
    return result
  }
  if (env === 'dev') {
    result = dev
  } else if (env === 'stage') {
    result = stage
  } else if (env === 'prod') {
    result = prod
  }
  return result
}

module.exports = localDevStageProd