import { useState } from "react"
import "./AccountDetails.css"
import { Question } from "../Question/Question"

export const AccountDetails = (props) => {
    const [newName, setNewName] = useState("")
    const [newPass, setNewPass] = useState("")

    const changeName = () => {
        if (newName != "") {
            props.onChangeName(newName,props.currentUserData.userKey)
            setNewName("")
        }
    }

    const changePass = () => {
        if (newPass != "") {
            props.onChangePass(newPass,props.currentUserData.userKey)
            setNewPass("")
        }
    }

    return (
        <>
            <div className="accountDetails">
                <div className="personalData">
                    Name: <input type="text" value={newName} 
                                            placeholder={props.currentUserData.name}
                                            onChange={(e)=>{setNewName(e.target.value)}}/>
                    <p>
                        <button onClick={()=>{changeName()}}>
                            Modify Name
                        </button>
                    </p>

                    Password: <input type="text" value={newPass} 
                                            placeholder={props.currentUserData.password}
                                            onChange={(e)=>{setNewPass(e.target.value)}}/>
                    <p>
                        <button onClick={()=>{changePass()}}>
                            Modify Password
                        </button>
                    </p>

                    Account Key: {props.currentUserData.userKey}
                </div>
                
                <div className="questionsData">
                    Your questions

                    {props.questions.map((question)=>{
                        if (question.ownerKey === props.currentUserData.userKey) {
                            return <Question 
                                        questionInfo={question}
                                        currentUserData={props.currentUserData}
                                        onRemoveQuestion={props.onRemoveQuestion}
                                        onQuestionDetails={props.onQuestionDetails}
                                    />
                        }else if (props.currentUserData.isAdmin == "true"){
                            return <Question 
                                        questionInfo={question}
                                        currentUserData={props.currentUserData}
                                        onRemoveQuestion={props.onRemoveQuestion}
                                        onQuestionDetails={props.onQuestionDetails}
                                    />
                        }
                    })}

                </div>
            </div>
        </>
    )
}