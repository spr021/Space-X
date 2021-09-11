import "./AllLaunches.scss"
import Table from "../../components/table/Table"
import { useEffect, useState } from "react";
import Axios from "../../../Axios";

function AllLaunches() {
const [launchData, setLaunchData] = useState([])

useEffect(() => {
  Axios.get("launches/")
  .then((resp) => {
    setLaunchData(resp.data)
  })
},[])

  return (
    <article className="all-launches">
      <Table data={launchData} />
      <aside>

      </aside>
    </article>
  );
}

export default AllLaunches;
