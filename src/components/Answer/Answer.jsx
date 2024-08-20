import { useState } from "react"
import "./Answer.css"

export const Answer = (props) => {
    const [isEditting, setIsEditting] = useState(false)
    let [newAnswer, setNewAnswer] = useState(props.answerInfo.content)

    const editAnswer = () => {
        if (newAnswer != ""){
            props.onEditAnswer(props.answerInfo, newAnswer)
            setIsEditting(false)
        }
    }


    return (
        <div className="answer">
            {props.answerInfo.isEditted == "true" ? "(Editted)":""} {props.answerInfo.ownerName} : {props.answerInfo.content}
            
            {props.questionInfo.isArchieved != "true" ? <p> {props.answerInfo.ownerKey == props.currentUserData.userKey || props.currentUserData.isAdmin == "true"? <button onClick={()=>{setNewAnswer(props.answerInfo.content);setIsEditting(!isEditting)}}>Edit</button> : ""} {props.currentUserData.isAdmin == "true" 
                ? <button onClick={()=>{props.onRemoveAnswer(props.answerInfo)}}>Remove</button> : ""}</p> : ""}


            {isEditting ? 
            <div className="cos">
                <input className="newAnswer" value={newAnswer} onChange={(e)=>{setNewAnswer(e.target.value)}}/>
                <button className="sendNewAnswerBtn" onClick={()=>{editAnswer()}}>Submit</button>
            </div>
            : ""}
        </div>
    )
}