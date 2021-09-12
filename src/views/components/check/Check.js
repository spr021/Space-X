import "./Check.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'

function Check({check = false}) {

  if (check) {
    return (<div className="true"><span class="tooltiptext">Successful</span><FontAwesomeIcon icon={faCheck} /></div>)
  }

  if (check === null) {
    return (<div className="unstate"><span class="tooltiptext">Un State</span><FontAwesomeIcon icon={faMinus} /></div>)
  }

  return (
    <div className="false"><span class="tooltiptext">Failure</span><FontAwesomeIcon icon={faTimes} /></div>
  )
}

export default Check;
