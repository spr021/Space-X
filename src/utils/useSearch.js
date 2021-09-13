import { useState } from "react"

const useSearch = () => {
  const [search, setSearch] = useState("")

  const hasSearchCondition = (item) => {
    return item.launch_site.site_name
      .toLowerCase()
      .includes(search.toLowerCase())
  }
  
  const requestSearch = (value) => {
    setSearch(value)
  }

  return { hasSearchCondition, requestSearch }
}
export default useSearch
