import "./QuestionPage.css"
import { Answer } from "../Answer/Answer"

export const QuestionPage = (props) => {

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
                    <p><input type="text" placeholder="Your answer"/></p>
                    {props.currentUserData.userKey == props.questionInfo.ownerKey || props.currentUserData.isAdmin == "true" ? <button className="yes">Submit Answer</button> : <button disabled>Submit Answer</button>}
                    <br />
                    {props.answers.map((answer)=>{
                        if (answer.questionKey == props.questionInfo.questionKey) {
                            return <Answer
                                        answerInfo={answer}
                                        currentUserData={props.currentUserData}
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