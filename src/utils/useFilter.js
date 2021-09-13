import { useState } from "react"

const useFilter = () => {
  const [filters, setFilters] = useState([])

  const hasFilterCondition = (item) => {
    if (!filters.length) return true
    return filters.includes(item.launch_site.site_name)
  }

  const requestFilter = (value) => {
    setFilters(value)
  }

  return { hasFilterCondition, filters, requestFilter }
}

export default useFilter
