import React from "react";
import s from './sideBar.module.css'

export default function SideBar({setContent}){

    const handleClick = (e)=>{
        e.preventDefault()
        setContent(e.target.value)
    }

    return(
            <div className={s.sideBar}>
                
                <button className={s.type} onClick={handleClick} value={('users')}>Users</button>
            
                <button className={s.type} onClick={handleClick} value={('products')}>Products</button>
            
                <button className={s.type} onClick={handleClick} value={('orders')}>Orders</button>
            
                <button className={s.type} onClick={handleClick} value={('categories')}>Categories</button>
            
            </div>
    )


}