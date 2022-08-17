import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = countries.filter((el) =>
    el.name.common.toLowerCase().startsWith(query.toLocaleLowerCase())
  );

  return (
    <>
      <div>
        Search :{" "}
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div>
        <p>Countries :</p>
        {query &&
          filtered.length >= 10 &&
          "Too many matches, specify another filter"}
        <>
          {query && filtered.length < 10 && filtered.length > 1 && (
            <ul>
              {filtered.map((el) => (
                <li key={el.cca3}>
                  {el.name.common}{" "}
                  <button onClick={() => setQuery(el.name.common)}>show</button>
                </li>
              ))}
            </ul>
          )}
          {query && filtered.length === 1 && (
            <>
              <h1>{filtered[0].name.common}</h1>
              <p>Capital: {filtered[0].capital[0]}</p>
              <p>Area: {filtered[0].area}</p>
              <h2>Languages :</h2>
              <ul>
                {Object.values(filtered[0].languages).map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
              <img src={filtered[0].flags.png} alt="country flag"></img>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default App;
