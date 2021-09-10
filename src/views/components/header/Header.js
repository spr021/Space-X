import "./Header.scss"
import Logo from "../../../assets/images/Logo.png"

function Header() {
  return (
    <header className="header">
      <img alt="Logo" src={Logo} />
      <span>Space X</span>
    </header>
  );
}

export default Header;
