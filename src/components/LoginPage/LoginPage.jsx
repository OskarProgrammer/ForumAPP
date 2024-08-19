import { useState } from "react"
import "./LoginPage.css"

export const LoginPage = (props) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if (login != "" && password != ""){
            props.onLogin(login, password)
        }else{

        }
    }

    return (
        <form className="loginForm" onSubmit={(e)=>{e.preventDefault()}}>
            <h1>Login Form</h1>

            <p>
                <input type="text" value={login} placeholder="Login" onChange={(e)=>{setLogin(e.target.value)}}/>
            </p>

            <p>
                <input type="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </p>

            <button onClick={()=>{handleLogin()}}>Login</button>

            <p>Haven't got account? 
                <a onClick={() =>{props.onRegisterForm()}}> Click here</a>
            </p>
        </form>
    )
}