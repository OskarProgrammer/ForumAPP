import "./QuestionPage.css"


export const QuestionPage = (props) => {


    return (
        <>
            {props.questionInfo.title}
            ZALOGOWANY JAKO {props.currentUserData.name}
        </>
    )
}