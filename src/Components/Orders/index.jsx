import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s  from './orders.module.css'
import Slider from '@mui/material/Slider';
import { sneakerToReview } from "../../Redux/Actions";
import { Link } from "react-router-dom";

const marks = [
    {
        value: 0,
        label: 'Canceled'
    },
    {
        value: 30,
        label: 'Pending'
    },
    {
        value: 60,
        label: 'In Progress'
    },
    {
        value: 100,
        label: 'Completed'
    }
];


function defaultValue(state) {
    switch (state) {
        case 'Canceled': return 0
        
        case 'Pending': return 30
        
        case 'In Progress': return 60
        case 'Completed': return 100
    }
}
export default function Orders(){
    const dispatch = useDispatch()


    const orders = useSelector(state => state.userOrders)

    return(
        <div className={s.container}>
            <h1>Orders</h1>
            
            <section className={s.orders}>
                {
                    orders
                    ?   orders.map(o => { return(
                        <div key={o.id} className={`bg-white card rounded-t-md  ${s.order}`}>
                            <section className={`card-header ${s.data}`}>
                                <p>Order No. {o.id}</p>
                                <p>Date. {o.date}</p>
                                <p><b>Total $ {o.total}</b></p>
                            </section>
                            <div className={s.orderContain}>
                            <div className={`${s.barContainer}`}>
                                <Slider
                                
                                    defaultValue={defaultValue(o.state)}
                                    orientation='vertical'
                                    marks={marks}
                                    disabled
                                />
                            </div>
                            <section className={s.products}>
                            <h3>Products</h3>
                                {
                                    o.products.map(p => { return (
                                        <div key={p.sneakerId} className={`card ${s.product}`}>
                                        <div className="row g-0">
                                                <div className={`${s.imgC} col-md-3`}>
                                                    <img src={p.image} className="img-fluid " alt="..."/>
                                                </div>
                                            <section className={`col-md-9  border-start`}>
                                                <h4 className={`card-title ${s.name}`}>{p.name}</h4>
                                                <div className={`card-body ${s.cb}`}>
                                                        <p>{p.description}</p>
                                                    <p>{typeof p.categories === 'object' ?  p.categories.map(c => ` ${c} |` ) : p.categories}</p>
                                                        <button value={p.sneakerId}><Link to={`/reviews/${p.sneakerId}`}>Create review</Link></button>
                                                    <div className={`border-top border-left ${s.dataP}`}>
                                                    <p>x {p.qty}</p>
                                                    <p> size. {p.size} </p>
                                                    {
                                                        p.discountPrice > 0 
                                                        ? <p className={s.priceDiscount}>$ {p.discountPrice}</p>
                                                        :<p className={s.price}>$ {p.price}</p>
                                                    }
                                            </div>
                                                </div>
                                                
                                            </section>
                                            
                                        </div>
                                        </div>)
                                    })
                                }
                            </section>
                            </div>
                            
                            
                        </div>)
                    })
                    : <h1>you dont have any order</h1>
                }
            </section>
        </div>
    )
}