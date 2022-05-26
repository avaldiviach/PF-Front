import React, {useState} from "react";
import { useSelector } from "react-redux";
import s from './sizes.module.css'

export default function SelectSizes({ handleSelectMultiChange }) {
    const [state, setstate] = useState({});
    const sizes = useSelector((state) => state.getSizes);
    
    const handleChange = (e) => {
        e.preventDefault()
        if(e.target.value !== 0){
            setstate({
                ...input,
                [e.target.name]: e.target.value
            })
        }
        handleSelectMultiChange(state, {name:'sizes'})
    }

    return (
        <div >
            <section className={s.container}>
                    {sizes.map( size => 
                                        <div className={s.size}>
                                            <p>{size.numberSize}</p>
                                            <input type='number' name={size.size} defaultValue={0} onChange={handleChange}></input>
                                        </div>
                                    )}
            </section>
        </div>
    );
}
