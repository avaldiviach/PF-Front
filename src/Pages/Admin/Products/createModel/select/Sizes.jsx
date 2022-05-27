import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import s from './sizes.module.css'

export default function SelectSizes({ handleSelectMultiChange }) {
    const [state, setstate] = useState([]);
    const sizes = useSelector((state) => state.getSizes);
    
    let mySize = []
    const handleChange = (e) => {
        e.preventDefault()
        mySize = state
        if(e.target.value !== 0){
            mySize =  mySize.filter(s => s.name !== e.target.name)
            setstate([
                ...mySize,
                {name: e.target.name, stock: e.target.value}
            ])
        }
        
        handleSelectMultiChange(state, {name:'sizes'})
    }

    return (
        <div >
            <section className={s.container}>
                    {sizes.map( size => 
                                        <div className={s.size} key={size.id}>
                                            <p className={s.number}>{size.numberSize}</p>
                                            <Form.Control className={s.input} type='number' name={size.numberSize} defaultValue={0} min={0} onChange={handleChange} />
                                        </div>
                                    )}
            </section>
        </div>
    );
}
