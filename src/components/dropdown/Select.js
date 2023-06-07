import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({ placeholder = "", image = "", translate = "", props }) => {
  const { show, toggle } = useDropdown();
  return (
    <div className="dropdown" translate={translate} onClick={toggle}>
      <span>{placeholder}</span>
      {translate ? (
        <img src={image} alt="language" />
      ) : (
        <span>
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  );
};

export default Select;
