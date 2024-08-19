import "./WelcomePage.css"



export const WelcomePage = (props) => {


    return (
        <div className="title">

            <h1>Welcome on the forum!</h1>
        
            <div className="buttonsDiv">

                <button onClick={()=>{props.onLoginPage()}}>
                    Sign In
                </button>
                
                <button onClick={()=>{props.onGuest()}}>
                    Continue As Guest
                </button>
            </div>
        </div>
    )

}