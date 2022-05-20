import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getSneakers } from "../../../Redux/Actions";
import Cards from '../../../Components/Cards'

export default function Products(){
    const dispatch = useDispatch()

    const sneakers = useSelector(state => state.Sneakers)



    return(
        <div className="userPage">
            <h1>Poducts</h1>
            <Cards renderSneakers={sneakers} admin={true}/>
        </div>
    )


}