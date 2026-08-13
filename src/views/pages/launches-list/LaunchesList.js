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

function LaunchesList({type = ""}) {
  const [launchData, setLaunchData] = useState([])
  const [loading, setLoading] = useState(true)
  const { hasSearchCondition, requestSearch } = useSearch()
  const { hasFilterCondition, filters, requestFilter } = useFilter()

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      
      try {
        const endpoints = {
          past: "launch/previous/?search=SpaceX&limit=100",
          upcoming: "launch/upcoming/?search=SpaceX&limit=100"
        };

        // Fetch all launches if no specific type is provided
        if (!type) {
          const [pastResp, upcomingResp] = await Promise.all([
            Axios.get(endpoints.past),
            Axios.get(endpoints.upcoming)
          ]);
          
          const allLaunches = [
            ...transformLaunchData(pastResp.data),
            ...transformLaunchData(upcomingResp.data)
          ];
          setLaunchData(allLaunches);
        } else {
          // Fetch specific type or default to upcoming
          const endpoint = endpoints[type] || endpoints.upcoming;
          const response = await Axios.get(endpoint);
          setLaunchData(transformLaunchData(response.data));
        }
      } catch (error) {
        console.error("Error fetching launch data:", error);
        setLaunchData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
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
