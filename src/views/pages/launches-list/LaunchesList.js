import { useEffect, useState } from "react"
import "./LaunchesList.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Filter from "../../components/filter/Filter"
import Axios from "../../../Axios"
import { useSearch, useFilter } from "../../../utils/Utils"
import { transformLaunchData } from "../../../utils/transformLaunchData"
import Menu from "../../components/menu/Menu"
import Header from "../../components/header/Header"
import Loading from "../../components/loading/Loading"
import Pagination from "../../components/pagination/Pagination"

const PAGE_SIZE = 10

function LaunchesList({type = ""}) {
  const [launchData, setLaunchData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalLaunches, setTotalLaunches] = useState(0)
  const { hasSearchCondition, requestSearch } = useSearch()
  const { hasFilterCondition, filters, requestFilter } = useFilter()

  useEffect(() => {
    setCurrentPage(1)
  }, [type])

  useEffect(() => {
    let ignoreResponse = false

    const fetchLaunches = async () => {
      setLoading(true)
      
      try {
        const endpoints = {
          all: "launch/",
          past: "launch/previous/",
          upcoming: "launch/upcoming/"
        }

        const offset = (currentPage - 1) * PAGE_SIZE
        const endpoint = endpoints[type] || endpoints.all
        const response = await Axios.get(endpoint, {
          params: {
            search: "SpaceX",
            limit: PAGE_SIZE,
            offset,
          },
        })

        if (ignoreResponse) return

        setLaunchData(transformLaunchData(response.data, offset))
        setTotalLaunches(response.data.count || 0)
      } catch (error) {
        if (ignoreResponse) return

        console.error("Error fetching launch data:", error);
        setLaunchData([])
        setTotalLaunches(0)
      } finally {
        if (!ignoreResponse) setLoading(false)
      }
    }

    fetchLaunches()

    return () => {
      ignoreResponse = true
    }
  }, [type, currentPage])


  //checks all conditions on each item
  const filterList = () => {
    return launchData.filter((item) => 
      hasFilterCondition(item) &&
      hasSearchCondition(item)
    )
  }

  return loading ? (<Loading />) : (
    <article className="launches">
      <div className="launch-results">
        <Table data={filterList()} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalLaunches / PAGE_SIZE)}
          totalItems={totalLaunches}
          onPageChange={setCurrentPage}
        />
      </div>
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
