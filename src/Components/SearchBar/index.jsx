import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { BiSearchAlt2 } from "react-icons/bi";
import { searchByName, getSneakers } from "../../Redux/Actions/";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    e.preventDefault();
    setSearchValue(inputValue);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    scroll.scrollTo(600);
    if (searchValue === "") {
      dispatch(getSneakers());
    } else {
      dispatch(searchByName(searchValue));
      setSearchValue("");
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleOnSubmit} className={styles.searchInputs}>
        <input
          type="text"
          placeholder="Search here.."
          onChange={handleChange}
          pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,100}"
          title="Search must be between 3 and 100 characters"
        />
        <button type="submit" className={styles.search_button}>
          Search
        </button>
        <div className={styles.searchIcon} onClick={handleOnSubmit}>
          <BiSearchAlt2 />
        </div>
      </form>
    </div>
  );
}
