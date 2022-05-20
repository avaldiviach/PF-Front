import React,{ useEffect } from "react";
import TableUsers from "./table";
import { useDispatch } from "react-redux";
import { getAllUsers, getSneakers } from "../../../Redux/Actions";


export default function UserContent(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllUsers())
    },[])



    return(
        <div className="userPage">
            <h1>Users</h1>
            <TableUsers/>
        </div>
    )


}