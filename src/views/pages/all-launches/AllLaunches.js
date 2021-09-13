import { useEffect, useState } from "react"
import "./AllLaunches.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Filter from "../../components/filter/Filter"
import Axios from "../../../Axios"
import { useSearch, useFilter } from "../../../utils/Utils"

function AllLaunches() {
  const [launchData, setLaunchData] = useState([])
  const { hasSearchCondition, requestSearch } = useSearch()
  const { hasFilterCondition, filters, requestFilter } = useFilter()

  useEffect(() => {
    Axios.get("launches/").then((resp) => {
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
    <article className="all-launches">
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

export default AllLaunches
