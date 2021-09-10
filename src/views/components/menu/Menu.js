import { Link } from "react-router-dom";
import "./Menu.scss"

function Menu() {
  return (
    <ul className="menu">
      <Link to="all-launches"><li>All Launches</li></Link>
      <Link to="past-launches"><li>Past Launches</li></Link>
      <Link to="upcoming-launches"><li>Upcoming Launches</li></Link>
    </ul>
  );
}

export default Menu;
