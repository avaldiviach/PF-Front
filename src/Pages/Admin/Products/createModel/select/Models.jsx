import React from 'react';
import { useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

export default function SelectModels({ handleSelectChange }){
    
    const models = useSelector(state => state.getModels)
    const options = models.map(m => ({value: m.nameModel, label:m.nameModel }))

    return(
        <div>
            <CreatableSelect
            name='model'
                options={options}
                onChange={(opt, meta) => handleSelectChange(opt, meta)}
            />
        </div>
    )
}