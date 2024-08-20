import "./Question.css"

export const Question  = (props) => {


    return (
        <>
            <div className="questionTab">
                <div onClick={()=>{props.onQuestionDetails(props.questionInfo)}}>
                    <p>{props.questionInfo.title}</p>
                    <p>{props.questionInfo.content}</p>
                </div>
                {props.currentUserData.isLogged == "true" || props.currentUserData.userKey == props.questionInfo.ownerKey ?
                    <button onClick={()=>{props.onRemoveQuestion(props.questionInfo)}}>Remove</button>            
                :""}
            </div>
        </>
    )
}