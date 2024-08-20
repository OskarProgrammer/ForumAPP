import { useState } from "react"
import "./MainPage.css"
import { AccountDetails } from "../AccountDetails/AccountDetails"
import { QuestionPage } from "../QuestionPage/QuestionPage"

export const MainPage = (props) => {
    const [isAccountDetails, setIsAccountDetails] = useState(false)
    const [isNewQuestion, setIsNewQuestion] = useState(false)
    const [isQuestionDetails, setIsQuestionDetails] = useState(false)

    let [currentQuestionDetails, setCurrentQuestionDetails] = useState({})

    const questionDetails = (questionInfo) => {
        currentQuestionDetails = questionInfo
        setCurrentQuestionDetails(currentQuestionDetails)

        setIsAccountDetails(false)
        setIsQuestionDetails(true)
    }

    return (
        <>
            <div className="navBar">
                {
                    props.currentUserData.isLogged == "true" ?
                        <button className="loginBtn" onClick={()=>{props.onLogOut()}}>LOGOUT</button>
                    : <button className="loginBtn" onClick={()=>{props.onLogin()}}>LOGIN</button>
                }
                {
                    props.currentUserData.isLogged == "true" ? 
                        <>
                            <button className="accountBtn" onClick={()=>{setIsAccountDetails(true); setIsNewQuestion(false)}}>Account Settings</button>
                            <button className="addNewQuestionBtn" onClick={()=>{setIsNewQuestion(true);setIsAccountDetails(false)}}>Add</button>
                        </>
                    : ""
                }
            </div>
            
            {(!isAccountDetails && !isNewQuestion) || props.currentUserData.isLogged=="false"? 
                <div className="searchBar">
                    <input type="text" placeholder="Search for questions by its keys, authors or titles..."/>
                    <button className="searchBtn">L</button>
                </div>
            : ""}


            <div className="mainContainer">
                {isQuestionDetails && !isAccountDetails && !isNewQuestion? 
                    <QuestionPage
                        questionInfo={currentQuestionDetails}
                    />
                :""}
                
                
                {isAccountDetails && !isNewQuestion && !isQuestionDetails? 
                    <AccountDetails 
                        currentUserData={props.currentUserData}
                        questions={props.questions}
                        onChangeName={props.onChangeName}
                        onChangePass={props.onChangePass}
                        onRemoveQuestion={props.onRemoveQuestion}
                        onQuestionDetails={questionDetails}
                    />
                    :""}
            </div>
        </>
    )
}