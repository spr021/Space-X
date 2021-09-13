import { useMemo, useState } from "react"

const useFilter = (items) => {
  const [filterValue, setFilterValue] = useState([])

  const filterItem = useMemo(() => {
    let filterableItemsByfilter = []

    if (filterValue.length) {
      filterValue.forEach((filterEl) => {
        let filterableItems = [...items]
        filterableItems = filterableItems
          .filter((item) => {
            return item.launch_site.site_name
              .toLowerCase()
              .includes(filterEl.toLowerCase())
          })
          .sort((a, b) => {
            if (
              a.launch_site.site_name
                .toLowerCase()
                .indexOf(filterEl.toLowerCase()) >
              b.launch_site.site_name
                .toLowerCase()
                .indexOf(filterEl.toLowerCase())
            ) {
              return 1
            } else if (
              a.launch_site.site_name
                .toLowerCase()
                .indexOf(filterEl.toLowerCase()) <
              b.launch_site.site_name
                .toLowerCase()
                .indexOf(filterEl.toLowerCase())
            ) {
              return -1
            } else {
              if (a.launch_site.site_name > b.launch_site.site_name) return 1
              else return -1
            }
          })
          filterableItemsByfilter.push(...filterableItems)
      })
    }
    return filterableItemsByfilter
  }, [items, filterValue])

  const requestFilter = (value) => {
    setFilterValue(value)
  }

  return { filterItem, filterValue, requestFilter }
}

export default useFilter
