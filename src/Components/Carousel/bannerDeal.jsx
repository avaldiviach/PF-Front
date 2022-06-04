import React from "react";
import s from './carousel.module.css'
import { Link } from "react-router-dom";
import Counter from "../Counter";
export default function BannerDeal({model, percentage, expiration, image,sneakerId}){

    return(
        <div className={`border ${s.banner}`}>
            <div className={s.container}>

                <section className={s.data}>
                    <h1 className={s.model}>{model}</h1>
                    <h4 className={s.por}>{percentage}% Discount</h4>
                    <Counter expiration={expiration}></Counter>
                    <Link to={`/detail/${sneakerId}`}>
                        <button className={s.shop}>shop now</button>        
                    </Link>
                </section>
                <section className={s.image}>
                    <section className={s.imgBack}></section>
                    <img src={image}/>
                </section>
            

            </div>
            
        </div>
    )
}