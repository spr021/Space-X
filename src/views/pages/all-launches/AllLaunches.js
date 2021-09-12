import { useEffect, useState } from "react";
import "./AllLaunches.scss"
import Table from "../../components/table/Table"
import Search from "../../components/search/Search"
import Axios from "../../../Axios";
import { useSearch } from "../../../utils/Utils";

function AllLaunches() {
const [launchData, setLaunchData] = useState([])
const [finalResult, setFinalResult] = useState(launchData)
const {items, requestSearch} = useSearch(launchData)

useEffect(() => {
  Axios.get("launches/")
  .then((resp) => {
    setLaunchData(resp.data)
    setFinalResult(resp.data)
  })
},[])

useEffect(() => {
  setFinalResult(items)
  // eslint-disable-next-line
},[requestSearch])

  return (
    <article className="all-launches">
      <Table data={finalResult} />
      <aside>
        <Search setSearch={requestSearch} />
      </aside>
    </article>
  );
}

export default AllLaunches;
