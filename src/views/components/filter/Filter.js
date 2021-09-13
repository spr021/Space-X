import { useEffect, useState } from "react/cjs/react.development";
import "./Filter.scss"

function Filter(props) {
  const [siteName, setSiteName] = useState([])

  const filter = (e) => {
    if (props.filterValue.includes(e.target.id)) {
      props.setFilter(props.filterValue.filter((item) => item !== e.target.id))
    } else {
      props.setFilter([...props.filterValue, e.target.id])
    }
  }

  useEffect(() => {
    setSiteName([...new Set(props.filterList.map((launch) => launch.launch_site.site_name))])
  },[props])

  return (
    <div className="filter">
      <span>Filter for Site Name</span>
      {siteName.map((item) => (
        <div>
          <input onChange={filter} type="checkbox" id={item} />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  )
}

export default Filter;