import "./dropdown.css";
import { useState } from "react";
export default function Dropdown({ regionName, setRegionName }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        <p>{regionName ? regionName : "Filter by Region"}</p>
        <div className="chevron-down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
      {isActive && (
        <div className="dropdown-content">
          <div
            className="dropdown-item"
            onClick={() => {
              setRegionName("Asia");
              setIsActive(!isActive);
            }}
          >
            Asia
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              setRegionName("Europe");
              setIsActive(!isActive);
            }}
          >
            Europe
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              setRegionName("Oceania");
              setIsActive(!isActive);
            }}
          >
            Oceania
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              setRegionName("Africa");
              setIsActive(!isActive);
            }}
          >
            Africa
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              setRegionName("America");
              setIsActive(!isActive);
            }}
          >
            America
          </div>
        </div>
      )}
    </div>
  );
}
