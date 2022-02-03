import { useState, useEffect } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";

function App() {
  const [value, onChange] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData(value);
  }, [value]);

  const fetchData = (value) => {
    setLoading(true);
    const time = value.toISOString().substr(0, 10);
    fetch(`https://api.nasa.gov/planetary/apod?date=${time}&api_key=DEMO_KEY`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        data.title && setLoading(false);
      });
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
              minDate={new Date("1995-06-16")}
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
        <>
          <div className="main">
            <p className="intro">
              Discover the cosmos! Each day a different image or photograph of
              our fascinating universe is featured, along with a brief
              explanation written by a professional astronomer.
            </p>
            <DatePicker
              onChange={onChange}
              value={value}
              clearIcon={null}
              minDate={new Date("1995-06-16")}
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
            {data.copyright && (
              <p>
                <span>Image Credit: </span>
                {data.copyright}
              </p>
            )}
            <p className="explanation">
              <span>Explanation: </span>
              {data.explanation}
            </p>
            <br />
            <p>
              <span>Tips: </span>1- Click on the image to get the higher
              resolution. 2- You can change the date from the calendar above.
            </p>
          </div>
          <footer>
            <p>
              This open-source project is powered by NASA Astronomy Picture of
              the Day API. You can get the source code from{" "}
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
      )}
    </>
  );
}

export default App;
