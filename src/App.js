import { useState, useEffect } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";

function App() {
  const [value, onChange] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchData(value);
  }, [value]);

  const fetchData = (value) => {
    const time = value.toISOString().substr(0, 10);
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${time}&api_key=FRWjok2uvAkO7TkgtZF1JfoeCdKIccFKiuxuZhtm`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        data.code !== (400 || 404) && setLoading(false);
      })
      .catch(() => setLoading(true));
  };

  return (
    <>
      <header>
        <h2>Astronomy Picture of Day</h2>
      </header>

      {isLoading ? (
        value > new Date() ? (
          <>
            <DatePicker
              onChange={onChange}
              value={value}
              clearIcon={null}
              maxDate={new Date()}
            />
            <h2 className="loading">
              Unfortunately there is no data for the selected date. Please
              choose another one.
            </h2>
          </>
        ) : (
          <h2 className="loading">Loading...</h2>
        )
      ) : (
        <div className="main">
          <DatePicker
            onChange={onChange}
            value={value}
            clearIcon={null}
            maxDate={new Date()}
          />
          <br />
          {data.media_type === "video" ? (
            <iframe src={data.url} title={data.title} />
          ) : (
            <a href={data.hdurl} target="_blank" rel="noopener noreferrer">
              <img src={data.url} alt={data.title} />
            </a>
          )}
          <h1>{data.title}</h1>
          <h3>{data.copyright}</h3>
          <p>
            <span>Explanation: </span>
            {data.explanation}
          </p>
          <hr />
        </div>
      )}

      <footer>
        <p>
          This project is powered by NASA Astronomy Picture of the Day. You can
          get the source code from{" "}
          <a
            href="https://github.com/armanabkar/apod-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p>Designed and Developed by Arman Abkar</p>
      </footer>
    </>
  );
}

export default App;
