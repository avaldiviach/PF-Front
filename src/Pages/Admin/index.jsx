import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SideBar from "./sideBar";
import s from './Admin.module.css'
import UserContent from "./Users";
import { getSneakers } from "../../Redux/Actions";
import Products from "./Products";

export default function Admin() {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')

    useEffect(()=>{
        dispatch(getSneakers())
    },[])


    return (
        <div className={s.admin_page}>
            <SideBar setContent={setContent} />
            <div className={s.content}>
                {
                    content && (() => {
                        switch (content) {
                            case 'users':
                                return <UserContent/>
                            case 'products':
                                return <Products/>
                            case 'orders':
                                return <h1>muy pronto orders</h1>
                            case 'categories':
                                return <h1>muy pronto categories</h1>
                        }
                    })()
                }
            </div>
        </div>
    )


}