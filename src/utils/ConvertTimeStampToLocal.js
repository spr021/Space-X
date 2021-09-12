const ConvertTimeStampToLocal = (timeStamp, locales, options) => {
  return new Date(timeStamp).toLocaleTimeString(locales, options)
}

export default ConvertTimeStampToLocal