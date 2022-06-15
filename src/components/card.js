import "../css/card.css";
import { Link } from "react-router-dom";
import React from "react";

const card = React.memo(
  ({ img, name, population, region, capital, isLoading }) => {
    console.log("card component ran");
    return (
      <>
        <Link to={`/${name}`} className="no-link card">
          <div className="card-grid">
            <div className="card-img">
              <img src={img} alt="country flag" />
            </div>

            <div className="card-details card-equal-width">
              <h3 className="country-name">{name}</h3>
              <p>
                <span className="specific-detail">Population </span> :{" "}
                {population}
              </p>
              <p>
                <span className="specific-detail">Region </span> : {region}
              </p>
              <p>
                <span className="specific-detail">Capital </span> : {capital}
              </p>
            </div>
          </div>
        </Link>
      </>
    );
  }
);
export default card;
