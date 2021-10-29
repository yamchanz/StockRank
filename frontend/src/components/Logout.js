import {axiosInstance as axios} from "../axios";
import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();

    useEffect(() => {
        axios.post("logout/", {
            refresh_token: localStorage.getItem('refresh_token')
        });

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        axios.defaults.headers["Authorization"] = null;
        history.push("/login");
    })

    return (
        <div>
            You've logged out.
        </div>
    );
}

export {Logout};