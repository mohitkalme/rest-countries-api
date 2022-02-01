import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/country-details.css";
import { Link } from "react-router-dom";

export default function CountryDetails() {
  let params = useParams();

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${params.id}`)
      .then((res) => res.json())
      .then((data) => {setFetchData(data); console.log(data)});
  }, [params.id]);

  return (
    <div className="details-main">
      <div className="container m-auto">
        {fetchData.map((item) => {
          let lang = Object.values(item.languages);
          let currencies = Object.values(item.currencies);

          return (
            <main >
              
              <Link to={`/`} className="no-link">
              <div className="back-badge">
                <div className="arrow-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </div>

                <p>Back</p>
              </div>
              </Link>
              <div key={item.name.common} className="country-details">
                <div className="country-flag">
                  <img src={item.flags.svg} alt="country flag" />
                </div>
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
                        <span className="font-600">Region </span> :{" "}
                        {item.region}
                      </li>
                      <li className="card-list">
                        <span className="font-600">Sub Region </span> :{" "}
                        {item.subregion}
                      </li>
                      <li className="card-list">
                        <span className="font-600">Capital </span> :{" "}
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
            </main>
          );
        })}
      </div>
    </div>
  );
}
