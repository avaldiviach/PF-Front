import React from 'react';
import { useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

export default function SelectColors({handleSelectChange}){
    
    const colors = useSelector(state => state.getColors)
    const options = colors.map(c => ({value: c.nameColor, label:c.nameColor }))

    return(
        <div>
            <CreatableSelect
            name='color'
                options={options}
                onChange={(opt, meta) => handleSelectChange(opt, meta)}
            />
        </div>
    )
}