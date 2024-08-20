import "./QuestionPage.css"
import { Answer } from "../Answer/Answer"
import { useState } from "react"

export const QuestionPage = (props) => {
    const [newAnswer, setNewAnswer] = useState("")

    const createNewAnswer = () => {
        if (newAnswer != "") {
            props.onCreateAnswer(props.questionInfo.questionKey, newAnswer, props.currentUserData.userKey, props.currentUserData.name)
            setNewAnswer("")
        }    
    }


    return (
        <>
            <div className="questionPage">
                <div className="questionInfo">
                    <h1>{props.questionInfo.title}</h1>
                    <div className="contentQuestion">
                        {props.questionInfo.content}
                    </div>
                    <br />
                    <p>Asked by {props.questionInfo.ownerName}{props.questionInfo.isEditted == "true" ? " (EDITTED)" : ""}</p>
                </div>


                <div className="answersSection">
                    {(props.currentUserData.userKey == props.questionInfo.ownerKey || props.currentUserData.isAdmin == "true") && props.questionInfo.isArchieved != "true" ? 
                    <p><input type="text" value={newAnswer} onChange={(e)=>{setNewAnswer(e.target.value)}} placeholder="Your answer"/></p> : <p><input type="text" value={newAnswer} onChange={(e)=>{setNewAnswer(e.target.value)}} placeholder="You cant add answer to this question" disabled/></p>}

                    {(props.currentUserData.userKey == props.questionInfo.ownerKey || props.currentUserData.isAdmin == "true") && props.questionInfo.isArchieved != "true" ? 
                        <button className="yes" onClick={()=>{createNewAnswer()}}>Submit Answer</button> 
                    : <button disabled>Submit Answer</button>}

                    <br />
                    {props.answers.map((answer)=>{
                        if (answer.questionKey == props.questionInfo.questionKey) {
                            return <Answer
                                        answerInfo={answer}
                                        currentUserData={props.currentUserData}
                                        questionInfo={props.questionInfo}
                                        onRemoveAnswer={props.onRemoveAnswer}
                                        onEditAnswer={props.onEditAnswer}
                                    />
                        }
                    })}
                </div>
            </div>
        </>
    )
}