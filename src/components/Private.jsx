import { useEffect, useState } from "react";

import {  useAuth} from "./context/auth";
import { Outlet } from "react-router-dom";
import SpinnerWheel from "./spinner/SpinnerWheel.jsx";
import Dashbord from "./Dashbord.jsx";

export default function PrivateRoute() {
    const[ok, setOk] = useState(false);
    const[auth, setAuth] = useAuth();

    useEffect (() => {
        const authCheck = async() => {
            const res = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/auth/user/dashboard',
                {
                  method: 'GET',
                  headers : {
                    "Content-Type" :"application/json",
                    "Authorization" : auth.token
                  },
                }
              );
              const data = await res.json();
              if(data.ok){
                setOk(true);
              }else{
                setOk(false);
              }
              
        }
        if(auth?.token) authCheck()
    },[auth?.token])



    return ok ? <Dashbord/> : <SpinnerWheel/>
}