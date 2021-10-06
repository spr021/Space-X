import { useEffect, useState } from "react"
import "./Filter.scss"

function Filter({filterList, filters, setFilter}) {
  const [siteName, setSiteName] = useState([])

  // sets filter based on consumed events
  const filter = (e) => {
    if (filters.includes(e.target.id)) {
      setFilter(filters.filter((item) => item !== e.target.id))
    } else {
      setFilter([...filters, e.target.id])
    }
  }

  useEffect(() => {
    // gets full names and removes duplicate items
    setSiteName([
      ...new Set(
        filterList.map((launch) => launch.launch_site.site_name)
      ),
    ])
  }, [filterList, filters])

  return (
    <div className="filter">
      <span>Filter for Site Name</span>
      {siteName.map((item, index) => (
        <div key={index}>
          <input onChange={filter} type="checkbox" id={item} />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  )
}

export default Filter
