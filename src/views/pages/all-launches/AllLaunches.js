import { useEffect, useState } from "react";
import "./AllLaunches.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Filter from "../../components/filter/Filter";
import Axios from "../../../Axios";
import { useSearch, useFilter } from "../../../utils/Utils";

function AllLaunches() {
const [launchData, setLaunchData] = useState([])
const [finalResult, setFinalResult] = useState(launchData)
const {items, requestSearch} = useSearch(launchData)
const {filterItem, filterValue, requestFilter} = useFilter(launchData)

useEffect(() => {
  Axios.get("launches/")
  .then((resp) => {
    setLaunchData(resp.data)
    setFinalResult(resp.data)
  })
},[])

useEffect(() => {
  setFinalResult(filterItem)
  // eslint-disable-next-line
},[requestFilter])

useEffect(() => {
  setFinalResult(items)
  // eslint-disable-next-line
},[requestSearch])

  return (
    <article className="all-launches">
      <Table data={finalResult} />
      <aside>
        <Search setSearch={requestSearch} />
        <Filter filterValue={filterValue} setFilter={requestFilter} filterList={launchData} />
      </aside>
    </article>
  );
}

export default AllLaunches;
