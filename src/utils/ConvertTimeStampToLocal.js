const ConvertTimeStampToLocal = (timeStamp, locales, options) => {
  if (typeof timeStamp !== "number" || Number.isNaN(timeStamp)) {
    return "—"
  }
  const defaultOptions = { dateStyle: "medium", timeStyle: "short" }
  return new Date(timeStamp * 1000).toLocaleString(locales, options || defaultOptions)
}

export default ConvertTimeStampToLocal
