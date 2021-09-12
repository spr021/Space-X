import "./Check.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'

function Check({check = false}) {

  if (check) {
    return (<div className="true"><span className="tooltiptext">Successful</span><FontAwesomeIcon icon={faCheck} /></div>)
  }

  if (check === null) {
    return (<div className="unstate"><span className="tooltiptext">Un State</span><FontAwesomeIcon icon={faMinus} /></div>)
  }

  return (
    <div className="false"><span className="tooltiptext">Failure</span><FontAwesomeIcon icon={faTimes} /></div>
  )
}

export default Check;
