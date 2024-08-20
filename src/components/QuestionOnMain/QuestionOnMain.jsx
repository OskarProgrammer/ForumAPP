import "./QuestionOnMain.css"


export const QuestionOnMain = (props) => {


    return (
        <div onClick={()=>{props.onQuestionDetails(props.questionInfo)}} className="questionTag">
            <p>{props.questionInfo.title}</p>
            <p>{props.questionInfo.ownerName}</p>
        </div>
    )
}