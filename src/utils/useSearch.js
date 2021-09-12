import { useMemo, useState } from "react"

const useSearch = (items) => {
  const [searchValue, setSearchValue] = useState("")
  
  const searchItem = useMemo(() => {
    let searchableItems = [...items]

    if (searchValue) {
      searchableItems = searchableItems
      .filter(item => {
        return item.launch_site.site_name.toLowerCase().includes(searchValue.toLowerCase())
      })
      .sort((a, b) => {
        if(a.launch_site.site_name.toLowerCase().indexOf(searchValue.toLowerCase()) > b.launch_site.site_name.toLowerCase().indexOf(searchValue.toLowerCase())) {
          return 1
        } else if (a.launch_site.site_name.toLowerCase().indexOf(searchValue.toLowerCase()) < b.launch_site.site_name.toLowerCase().indexOf(searchValue.toLowerCase())) {
            return -1
        } else {
            if(a.launch_site.site_name > b.launch_site.site_name)
              return 1
            else
              return -1
        }
      })
    }

    return searchableItems
  }, [items, searchValue])

  const requestSearch = (value) => {
    setSearchValue(value)
  }

  return { items: searchItem, requestSearch }
}

export default useSearch