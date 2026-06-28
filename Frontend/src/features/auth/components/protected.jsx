import {useAuth} from "../hooks/useAuth.js"
import React from "react";
import {Navigate} from "react-router";

const Protected = ({children}) => {
    const {user, loading} = useAuth();
    
    if(loading)
    {
        return <main>
            <h2>Loading...</h2>
        </main>
    }
    if(!user)
    {
        return <Navigate to="/login" replace />
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Protected;


