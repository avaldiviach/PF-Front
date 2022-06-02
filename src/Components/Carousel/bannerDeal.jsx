import React from "react";
import s from './carousel.module.css'

export default function BannerDeal({model, percentage, exppiration, image}){

    return(
        <div className={s.banner}>
            <div className={s.container}>

                <section className={s.data}>
                    <h1 className={s.model}>{model}</h1>
                    <h4>{percentage}% Discount</h4>
                    <button className={s.shop}>shop now</button>        
                </section>
                <section className={s.image}>
                    <img src={image}/><div className={s.imgBack}></div>
                </section>
            

            </div>
            
        </div>
    )
}