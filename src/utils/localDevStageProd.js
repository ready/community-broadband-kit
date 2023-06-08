export default function localDevStageProd ({ local, dev, stage, prod }) {
  const env = process.env.REACT_APP_ENVIRONMENT
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
