import "./NotFound404.scss"
import Earth from "../../../assets/images/Earth.png"
import Mars from "../../../assets/images/Mars.png"
import Menu from "../../components/menu/Menu"

function NotFound404() {
  return (
    <main className="notfound">
      <div>
        <h1>
          404
        </h1>
      </div>
      <Menu />
      <img alt="Earth" src={Earth} />
      <img alt="Mars" src={Mars} className="mars" />
    </main>
  )
}

export default NotFound404
