import { useState } from "react"
import "./RegisterPage.css"

export const RegisterPage = (props) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repatedPassword, setRepatedPassword] = useState("")

    const [isError, setIsError] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const handleRegister = (isAdmin) => {
        if (login != "" && password == repatedPassword && isAdmin){
            setIsAdmin(true)
        }else if (login != "" && password == repatedPassword && !isAdmin){
            props.onRegister(login, password, false)
        }else{
            setIsError(true)
        }


    }

    return (
        <>
        
            <form className="registerForm" onSubmit={(e)=>{e.preventDefault()}}>
                <h1>Register Form</h1>

                <p>
                    <input type="text" value={login} placeholder="Login" onChange={(e)=>{setLogin(e.target.value)}}/>
                </p>

                <p>
                    <input type="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </p>

                <p>
                    <input type="password" value={repatedPassword} placeholder="Repeat Password" onChange={(e)=>{setRepatedPassword(e.target.value)}}/>
                </p>

                <button onClick={()=>{handleRegister(true)}}>Register as a admin </button>
                <button onClick={()=>{handleRegister(false)}}>Register as a questioner</button>

                <p>Have got account? 
                    <a onClick={() =>{props.onLoginForm()}}> Click here</a>
                </p>
            </form>

            {isError || isAdmin ? 
                <div className="errorMessage">
                    <div>
                        <button onClick={()=>{
                            if(isAdmin){
                                setIsAdmin(false)
                                props.onRegister(login, password, true)
                            }else{
                                setIsError(false)
                            }

                            }}>X</button>
                    </div>
                    <p>
                        {isAdmin == true ? "You have to wait for the verification of your admin acocunt" : "You have put wrong data into the form"}
                    </p>
                </div>
            : ""}

        </>
    )
}