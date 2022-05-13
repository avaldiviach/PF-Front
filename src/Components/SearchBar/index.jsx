import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { searchByName } from "../../Redux/Actions/";


export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue ] = useState("");

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
    <>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\-., ]{3,100}"
          title="Search must be between 3 and 100 characters"
        />
        <button type="submit">Search</button>
      </form>
    </>
  )
}

