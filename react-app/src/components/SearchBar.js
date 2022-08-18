import React, { useState } from "react";
import "./SearchBar.css";
import { NavLink } from "react-router-dom";

const SearchBar = ({ placeholder, users }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e) => {
    const search = e.target.value;
    setWordEntered(search);
    const searchResult = users.filter((user) => {
      let name =
        user.first_name.toLowerCase() + " " + user.last_name.toLowerCase();
      return name.toLowerCase().trim().includes(search.trim().toLowerCase());
    });
    if (search.trim() === "") {
      setFilteredData([]);
    } else {
      setFilteredData(searchResult);
    }
  };

  const handleClear = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="search-inputs">
        {wordEntered.length === 0 ? (
          <i className="fa-solid fa-magnifying-glass search-magnifying"></i>
        ) : (
          <i className="fa-solid fa-arrow-left" onClick={handleClear}></i>
        )}
        <input
          value={wordEntered}
          type="text"
          className="searchbar-input"
          placeholder={placeholder}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="data-result">
          {filteredData.slice(0, 8).map((user, key) => {
            return (
              <NavLink
                to={`/${user.id}`}
                className="data-item"
                onClick={handleClear}
              >
                <img className="profile-picture-nav" src={user.profile_pic} />{" "}
                <p className="search-p">
                  {user.first_name} {user.last_name}
                </p>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
