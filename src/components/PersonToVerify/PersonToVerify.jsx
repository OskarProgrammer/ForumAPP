import "./PersonToVerify.css"

export const PersonToVerify = (props) => {

    return (
        <div className="personTag">
            <p>Username: {props.personInfo.name}</p>
            <p>Password: {props.personInfo.password}</p>
            <div className="buttonsBar">
                <button onClick={()=>{props.onVerifying(true, props.personInfo.userKey)}} className="acceptButton">Accept</button>
                <button onClick={()=>{props.onVerifying(false, props.personInfo.userKey)}} className="declineButton">Decline</button>
            </div>
        </div>
    )
}