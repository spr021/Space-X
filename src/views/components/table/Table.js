import { useState } from "react"
import "./Table.scss"
import { ConvertTimeStampToLocal } from "../../../utils/Utils"
import Check from "../check/Check"
import LaunchModal from "../launch-modal/LaunchModal"

function Table(props) {
  const [selectedLaunch, setSelectedLaunch] = useState(null)

  const handleRowClick = (launch) => {
    setSelectedLaunch(launch)
  }

  const handleCloseModal = () => {
    setSelectedLaunch(null)
  }

  return (
    <>
      <div className="wrap-table">
        <div className="table">
          <div className="table-head">
            <table>
              <thead>
                <tr>
                  <th className="column1">Flight</th>
                  <th className="column2">Launch Date</th>
                  <th className="column3">Rocket Name</th>
                  <th className="column4">Rocket Type</th>
                  <th className="column5">Site Name</th>
                  <th className="column6">State</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body">
            <table>
              <tbody>
                {props.data.map((launch, index) => (
                  <tr key={index} onClick={() => handleRowClick(launch)} className="clickable-row">
                    <td className="column1">{launch.flight_number}</td>
                    <td className="column2">{ConvertTimeStampToLocal(launch.launch_date_unix)}</td>
                    <td className="column3">{launch.rocket.rocket_name}</td>
                    <td className="column4">{launch.rocket.rocket_type}</td>
                    <td className="column5">{launch.launch_site.site_name}</td>
                    <td className="column6"><Check check={launch.launch_success} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedLaunch && (
        <LaunchModal launch={selectedLaunch} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default Table
