import {axiosInstance as axios} from "../axios";
import React, {useState} from "react";
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    const [accountName, setAccountName] = useState("");
    const [password, setPassWord] = useState("");

    const inputAccountNameHandler = (event) => {
        setAccountName(event.target.value);
    }

    const inputPasswordHandler = (event) => {
        setPassWord(event.target.value);
    }

    const loginHandler = (event) => {
        const user = {
            userlogin: accountName,
            password: password
        };

        axios.post("token/", user)
            .then((res) => {
                console.log(res.data.access);
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axios.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
                history.push("/watchlist");
            });
    }

    return (
        <div>
            <div>
                <p>Account Name</p>
                <input type="text" onChange={inputAccountNameHandler} value={accountName}></input>
            </div>
            <div>
                <p>Password</p>
                <input type="password" onChange={inputPasswordHandler} value={password}></input>
            </div>
            <button onClick={loginHandler}>Login</button>
        </div>
    )
}

export {Login};