import { useEffect, useState } from "react"
import "./UpcomingLaunches.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Filter from "../../components/filter/Filter"
import Axios from "../../../Axios"
import { useSearch, useFilter } from "../../../utils/Utils"

function UpcomingLaunches() {
  const [launchData, setLaunchData] = useState([])
  const { hasSearchCondition, requestSearch } = useSearch()
  const { hasFilterCondition, filters, requestFilter } = useFilter()

  useEffect(() => {
    Axios.get("launches/upcoming").then((resp) => {
      setLaunchData(resp.data)
    })
  }, [])

  const filterList = () => {
    let result = []
    launchData.forEach((item) => {
      if (!hasFilterCondition(item)) return
      if (!hasSearchCondition(item)) return
      result.push(item)
    })
    return result
  }

  return (
    <article className="upcoming-launches">
      <Table data={filterList()} />
      <aside>
        <Search setSearch={requestSearch} />
        <Filter
          filters={filters}
          setFilter={requestFilter}
          filterList={launchData}
        />
      </aside>
    </article>
  )
}

export default UpcomingLaunches