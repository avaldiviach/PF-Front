import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import s from './sizes.module.css'

export default function SelectSizes({ handleSelectMultiChange, sizesSneaker }) {
    const [state, setstate] = useState([]);
    const sizes = useSelector((state) => state.getSizes);

    useEffect(() => {
        handleSelectMultiChange(state, { name: 'sizes' })
    }, [state]);

    let mySize = []
    const handleChange = (e) => {
        e.preventDefault()
        mySize = state
        if (e.target.value !== 0) {
            if (sizesSneaker) {
                mySize = mySize.filter(s => s.numberSize != e.target.name)
                setstate([
                    ...mySize,
                    { numberSize: e.target.name, stock: e.target.value }
                ])
            } else {
                mySize = mySize.filter(s => s.name !== e.target.name)
                setstate([
                    ...mySize,
                    { name: e.target.name, stock: e.target.value }
                ])
            }

        }
    }

    return (
        <div >
            <section className={s.container}>
                {sizesSneaker ?
                    sizes.map((size) =>
                        <div className={s.size} key={size.id}>
                            <p className={s.number}>{size.numberSize}</p>
                            <Form.Control className={s.input} type='number' name={size.numberSize} defaultValue={sizesSneaker.filter(s => s.size === size.numberSize).length > 0 ? sizesSneaker.filter(s => s.size === size.numberSize)[0].stock : 0} min={0} onChange={handleChange} />
                        </div>
                    )

                    : sizes.map((size) =>
                        <div className={s.size} key={size.id}>
                            <p className={s.number}>{size.numberSize}</p>
                            <Form.Control className={s.input} type='number' name={size.numberSize} defaultValue={0} min={0} onChange={handleChange} />
                        </div>
                    )}
            </section>
        </div>
    );
}
