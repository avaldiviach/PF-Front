import React from "react";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";

export default function SelectCategories({ handleSelectChange }) {
  const categories = useSelector((state) => state.categories);
  const options = categories.map((c) => ({
    value: c.nameCategory,
    label: c.nameCategory,
  }));

  return (
    <div>
      <CreatableSelect
        name="categories"
        options={options}
        onChange={(opt, meta) => handleSelectChange(opt, meta)}
      />
    </div>
  );
}
