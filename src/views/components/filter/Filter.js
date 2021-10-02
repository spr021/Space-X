import { useEffect, useState } from "react"
import "./Filter.scss"

function Filter(props) {
  const [siteName, setSiteName] = useState([])

  // sets filter based on consumed events
  const filter = (e) => {
    if (props.filters.includes(e.target.id)) {
      props.setFilter(props.filters.filter((item) => item !== e.target.id))
    } else {
      props.setFilter([...props.filters, e.target.id])
    }
  }

  useEffect(() => {
    // gets full names and removes duplicate items
    setSiteName([
      ...new Set(
        props.filterList.map((launch) => launch.launch_site.site_name)
      ),
    ])
  }, [props])

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
