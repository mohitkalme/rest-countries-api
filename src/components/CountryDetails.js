import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/country-details.css";

export default function CountryDetails() {
  let params = useParams();

  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${params.id}`)
      .then((res) => res.json())
      .then((data) => setFetchData(data));
  }, [params.id]);

  return (
    <div className="details-main">
      <div className="container m-auto">
        {fetchData.map((item) => {
          let lang = Object.values(item.languages);
          let currencies = Object.values(item.currencies);

          return (
            <div key={item.name.common} className="country-details">
              <img src={item.flags.svg} alt="country flag" />
              <div className="card-main">
                <h1 className="card-title">{item.name.common}</h1>

                <div className="card-box">
                  <ul className="card-ul">
                    <li className="card-list">
                      <span className="font-600">Native Name </span> :{" "}
                      {item.name.common}
                    </li>
                    <li className="card-list">
                      <span className="font-600">Population </span> :{" "}
                      {item.population}
                    </li>
                    <li className="card-list">
                      <span className="font-600">Region </span> : {item.region}
                    </li>
                    <li className="card-list">
                      <span className="font-600">Sub Region </span> :{" "}
                      {item.subregion}
                    </li>
                    <li className="card-list">
                      <span className="font-600">Capital </span> : {" "}
                      {item.capital}
                    </li>
                  </ul>

                  <ul className="card-ul">
                    <li className="card-list">
                      <span className="font-600">Top Level Domain </span> :{" "}
                      {item.tld}{" "}
                    </li>
                    <li className="card-list">
                      <span className="font-600">Currencies </span> :{" "}
                      {currencies.map((i) => `${i.name}, `)}
                    </li>
                    <li className="card-list">
                      <span className="font-600">Languages </span> :{" "}
                      {lang.map((i) => `${i}, `)}{" "}
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
