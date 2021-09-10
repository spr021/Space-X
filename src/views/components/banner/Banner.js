import "./Banner.scss"
import Earth from "../../../assets/images/Earth.png"
import Mars from "../../../assets/images/Mars.png"

function Banner() {
  return (
    <article className="banner">
      <div>
        <h1>Expand beyound <br /> the Univers.</h1>
        <p>On Sunday, August 29 at 3:14 a.m. EDT Falcon 9 <br /> launched Dragon on the 23rd Commercial Resupply <br /> Services (CRS-23) mission from Launch Complex 39A <br /> (LC-39A) at Kennedy Space Center, Florida.  </p>
      </div>
      <img alt="Earth" src={Earth} />
      <img alt="Mars" src={Mars} className="mars" />
    </article>
  );
}

export default Banner;
