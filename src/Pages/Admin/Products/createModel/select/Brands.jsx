import React from "react";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";

export default function SelecBrand({ handleSelectChange }) {
    const brands = useSelector((state) => state.getBrands);
    const options = brands.map((c) => ({
        value: c.nameBrand,
        label: c.nameBrand,
    }));

    return (
        <div>
            <CreatableSelect
                name="brand"
                options={options}
                onChange={(opt, meta) => handleSelectChange(opt, meta)}
            />
        </div>
    );
}
