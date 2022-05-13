import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { searchByName } from "../../Redux/Actions/";
import styles from "./SearchBar.module.css";
import { BiSearchAlt2 } from 'react-icons/bi';


export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    e.preventDefault();
    setSearchValue(inputValue);
    // setCurrentPage(1);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByName(searchValue));
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleOnSubmit} className={styles.searchInputs}>
        <input
          type="text"
          placeholder="Search here.."
          onChange={handleChange}
          pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\-., ]{3,100}"
          title="Search must be between 3 and 100 characters"
        />
        <button type="submit" className={styles.search_button}>Search</button>
        <div className={styles.searchIcon} onClick={handleOnSubmit}>
          <BiSearchAlt2 />
        </div>
      </form>
    </div>
  )
}

