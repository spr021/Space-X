import "./Header.scss"
import Logo from "../../../assets/images/Logo.png"
import { Link } from "react-router-dom"
import ThemeToggle from "../theme-toggle/ThemeToggle"

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img alt="Logo" src={Logo} />
        <span>Space X</span>
      </Link>
      <ThemeToggle />
    </header>
  )
}

export default Header