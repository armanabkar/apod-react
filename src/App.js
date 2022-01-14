import { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";

function App() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <header>
        <h2>Astronomy Picture of Day</h2>
      </header>

      <div className="main">
        <DatePicker onChange={onChange} value={value} />
        <br />
        <img
          src="https://apod.nasa.gov/apod/image/2201/NGC1566LRGBHa-Hanson-SelbyFinal1024.jpg"
          alt="NGC 1566: The Spanish Dancer Spiral Galaxy"
        />
        <h2>NGC 1566: The Spanish Dancer Spiral Galaxy</h2>
        <h3>Mark Hanson and Mike Selby</h3>
        <p>
          <span>Explanation: </span>An island universe of billions of stars, NGC
          1566 lies about 60 million light-years away in the southern
          constellation Dorado. Popularly known as the Spanish Dancer galaxy,
          it's seen face-on from our Milky Way perspective. A gorgeous grand
          design spiral, this galaxy's two graceful spiral arms span over
          100,000 light-years, traced by bright blue star clusters, pinkish
          starforming regions, and swirling cosmic dust lanes. NGC 1566's
          flaring center makes the spiral one of the closest and brightest
          Seyfert galaxies. It likely houses a central supermassive black hole
          wreaking havoc on surrounding stars, gas, and dust. In this sharp
          southern galaxy portrait, the spiky stars lie well within the Milky
          Way.
        </p>
      </div>

      <footer>
        <p>Designed and Developed by Arman Abkar</p>
      </footer>
    </>
  );
}

export default App;
