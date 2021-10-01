import { useEffect, useState } from "react"
import "./PastLaunches.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Filter from "../../components/filter/Filter"
import Axios from "../../../Axios"
import { useSearch, useFilter } from "../../../utils/Utils"
import Header from "../../components/header/Header"
import Menu from "../../components/menu/Menu"
import Loading from "../../components/loading/Loading"

function PastLaunches() {
  const [launchData, setLaunchData] = useState([])
  const [loading, setLoading] = useState(true)
  const { hasSearchCondition, requestSearch } = useSearch()
  const { hasFilterCondition, filters, requestFilter } = useFilter()

  useEffect(() => {
    setLoading(true)
    Axios.get("launches/past")
    .then((resp) => {
      setLaunchData(resp.data)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  //checks all conditions on each item
  const filterList = () => {
    return launchData.filter((item) => 
      hasFilterCondition(item) &&
      hasSearchCondition(item)
    )
  }

  return loading ? (<Loading />) : (
    <article className="past-launches">
      <Table data={filterList()} />
      <div>
        <aside>
          <Header />
          <Menu vertical />
        </aside>
        <aside>
          <Search setSearch={requestSearch} />
          <Filter
            filters={filters}
            setFilter={requestFilter}
            filterList={launchData}
          />
        </aside>
      </div>
    </article>
  )
}

export default PastLaunches
