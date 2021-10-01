import { useEffect, useState } from "react"
import "./LaunchesList.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Filter from "../../components/filter/Filter"
import Axios from "../../../Axios"
import { useSearch, useFilter } from "../../../utils/Utils"
import Menu from "../../components/menu/Menu"
import Header from "../../components/header/Header"
import Loading from "../../components/loading/Loading"

function LaunchesList({type = ""}) {
  const [launchData, setLaunchData] = useState([])
  const [loading, setLoading] = useState(true)
  const { hasSearchCondition, requestSearch } = useSearch()
  const { hasFilterCondition, filters, requestFilter } = useFilter()

  useEffect(() => {
    setLoading(true)
    Axios.get("launches/" + type)
    .then((resp) => {
      setLaunchData(resp.data)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [type])


  //checks all conditions on each item
  const filterList = () => {
    return launchData.filter((item) => 
      hasFilterCondition(item) &&
      hasSearchCondition(item)
    )
  }

  return loading ? (<Loading />) : (
    <article className="launches">
      <Table data={filterList()} />
      <div className="boxes">
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

export default LaunchesList
