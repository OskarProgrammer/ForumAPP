import { useState } from "react"
import "./QuestionCreator.css"


export const QuestionCreator = (props) =>{ 
    const [newQuestionTitle, setNewQuestionTitle] = useState("")
    const [newQuestionContent, setNewQuestionContent] = useState("")

    const createNewQuestion = () => {
        if (newQuestionContent != "" && newQuestionTitle != ""){
            props.onCreateNewQuestion(props.currentUserData, newQuestionTitle, newQuestionContent)
            setNewQuestionContent("")
            setNewQuestionTitle("")
        }
    }

    return (
        <>
            <div className="questionCreator">
                <h1>Question Creator</h1>
                <p><input type="text" value={newQuestionTitle} onChange={(e)=>{setNewQuestionTitle(e.target.value)}} placeholder="Title"/></p>
                <p><input type="text" value={newQuestionContent} onChange={(e)=>{setNewQuestionContent(e.target.value)}} placeholder="Content"/></p>
                <button onClick={()=>{createNewQuestion()}}>Create question</button>
            </div>  
        </>
    )
}