import "./Header.scss"
import Logo from "../../../assets/images/Logo.png"
import { Link } from "react-router-dom"

function Header() {
  return (
    <Link to="/" className="header">
      <header>
        <img alt="Logo" src={Logo} />
        <span>Space X</span>
      </header>
    </Link>
  )
}

export default Header
