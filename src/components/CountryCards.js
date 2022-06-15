import "../css/country-cards.css";
import React, { useState, useEffect } from "react";

import Card from "./card";
import Dropdown from "./Dropdown";

import MySkeleton from "./mySkeleton";
export default function CountryCards(props) {
  const API_ENDPOINT = "https://restcountries.com/v3.1/";

  const [urlParams, setUrlParams] = useState(
    `alpha?codes=PER,AUT,COL,RUS,JPN,AUS,USA,UKR`
  );
  const [url, setUrl] = useState(`${API_ENDPOINT}${urlParams}`);
  const [fetchData, setFetchData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 404) {
          setIsError(true);
          setIsLoading(false);
          setFetchData([]);
        } else {
          setFetchData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [url]);
  const handleSearchInput = (event) => {
    if (event.target.value.trim()) {
      setUrlParams(`name/${event.target.value}`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setUrl(`${API_ENDPOINT}${urlParams}`);
  };

  // ------------------------------------ For Select Tag ------------------------------
  const API_ENDPOINT_REGION = "https://restcountries.com/v3.1/region/";

  const [regionName, setRegionName] = useState("");

  const handleFetchRegion = React.useCallback(() => {
    if (!regionName) return;
    setIsLoading(true);
    setIsError(false);
    fetch(`${API_ENDPOINT_REGION}${regionName}`)
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [regionName]);
  useEffect(() => {
    handleFetchRegion();
  }, [handleFetchRegion]);

  // ------------------------------------ For Select Tag   ------------------------------
  return (
    <main>
      <div className="container m-auto">
        <div className="input-section">
          <div className="input-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Search for a country"
                onChange={handleSearchInput}
              />
            </form>
          </div>
          <Dropdown regionName={regionName} setRegionName={setRegionName} />
        </div>
        <div className="cards ">
          {isError ? (
            <div className="NO-RESULTS">
              <div className="error-emoji">\(o_o)/</div>
              <div className="error-message">Can't find any country.</div>
            </div>
          ) : (
            fetchData.map((item) => {
              return (
                <>
                  {isLoading ? (
                    <MySkeleton />
                  ) : (
                    <Card
                      key={item.name.common}
                      img={item.flags.svg}
                      name={item.name.common}
                      population={item.population}
                      region={item.region}
                      capital={item.capital}
                    />
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
