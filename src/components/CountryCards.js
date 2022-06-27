import "../css/country-cards.css";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import Card from "./card";
import Dropdown from "./Dropdown";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const API_ENDPOINT = "https://restcountries.com/v3.1/";

const countryReducer = (state, action) => {
  switch (action.type) {
    case "COUNTRY_FETCH_INIT":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case "COUNTRY_FETCH_SUCCESS":
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload,
      };
    case "COUNTRY_FETCH_FAILURE":
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      throw new Error();
  }
};

export default function CountryCards() {
  const [urlParams, setUrlParams] = useState(
    `alpha?codes=PER,AUT,COL,RUS,JPN,AUS,USA,UKR`
  );
  const [url, setUrl] = useState(`${API_ENDPOINT}${urlParams}`);

  const [countries, dispatchCountries] = useReducer(countryReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchCountries = useCallback(async () => {
    dispatchCountries({ type: "COUNTRY_FETCH_INIT" });
    try {
      const result = await axios.get(url);
      dispatchCountries({
        type: "COUNTRY_FETCH_SUCCESS",
        payload: result.data,
      });
    } catch (error) {
      dispatchCountries({ type: "COUNTRY_FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleFetchCountries();
  }, [handleFetchCountries]);

  const handleSearchInput = (event) => {
    if (event.target.value.trim()) {
      setUrlParams(`name/${event.target.value}`);
    }
  };
  const handleSubmit = (e) => {
    setUrl(`${API_ENDPOINT}${urlParams}`);
    e.preventDefault();
  };

  // ------------------------------------ For Select Tag ------------------------------
  const API_ENDPOINT_REGION = "https://restcountries.com/v3.1/region/";

  const [regionName, setRegionName] = useState("");

  const handleFetchRegion = React.useCallback(async () => {
    if (!regionName) return;
    dispatchCountries({ type: "COUNTRY_FETCH_INIT" });
    try {
      const result = await axios.get(`${API_ENDPOINT_REGION}${regionName}`);
      dispatchCountries({
        type: "COUNTRY_FETCH_SUCCESS",
        payload: result.data,
      });
    } catch (error) {
      dispatchCountries({ type: "COUNTRY_FETCH_FAILURE" });
    }
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
          {countries.isError ? (
            <div className="NO-RESULTS">
              <div className="error-emoji">\(o_o)/</div>
              <div className="error-message">Can't find any country.</div>
            </div>
          ) : 
          countries.isLoading ? (
          
            <div className="CIRCULAR_PROGRESS">
              <CircularProgress />
            </div>
          ):
          (
            countries.data.map((item) => {
              return (
                <>
                  <Card
                    key={item.name.common}
                    img={item.flags.svg}
                    name={item.name.common}
                    population={item.population}
                    region={item.region}
                    capital={item.capital}
                  />
                </>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
