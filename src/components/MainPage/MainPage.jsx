import { useState } from "react"
import "./MainPage.css"
import { AccountDetails } from "../AccountDetails/AccountDetails"
import { QuestionPage } from "../QuestionPage/QuestionPage"
import { QuestionOnMain } from "../QuestionOnMain/QuestionOnMain"
import { PersonToVerify } from "../PersonToVerify/PersonToVerify"
import { QuestionCreator } from "../QuestionCreator/QuestionCreator"

export const MainPage = (props) => {
    const [isAccountDetails, setIsAccountDetails] = useState(false)
    const [isNewQuestion, setIsNewQuestion] = useState(false)
    const [isQuestionDetails, setIsQuestionDetails] = useState(false)
    const [isVeryfing, setIsVeryfing] = useState(false)

    let [currentQuestionDetails, setCurrentQuestionDetails] = useState({})
    let [keyPhrase, setKeyPhrase] = useState("")
    let [valueOfInput, setValueOfInput] = useState("")

    const questionDetails = (questionInfo) => {
        currentQuestionDetails = questionInfo
        setCurrentQuestionDetails(currentQuestionDetails)

        setIsNewQuestion(false)
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
                            <button className="accountBtn" onClick={()=>{setIsAccountDetails(true); 
                                                                        setIsNewQuestion(false);
                                                                        setIsQuestionDetails(false);
                                                                        setIsVeryfing(false)}}>
                                                                            Account Settings
                            </button>
                            <button className="addNewQuestionBtn" onClick={()=>{setIsNewQuestion(true);setIsAccountDetails(false);setIsQuestionDetails(false); setIsVeryfing(false)}}>Add</button>
                        </>
                    : ""
                }

                { props.currentUserData.isAdmin == "true" ? 
                    <button className="verifyUsersBtn" onClick={()=>{setIsNewQuestion(false);setIsAccountDetails(false);setIsQuestionDetails(false); setIsVeryfing(true)}}>Verify Users</button>
                :""}

                <button className="mainPageBtn" onClick={()=>{setIsNewQuestion(false);setIsAccountDetails(false);setIsQuestionDetails(false);setIsVeryfing(false)}}>Main</button>
            </div>
            
            {(!isAccountDetails && !isNewQuestion && !isVeryfing) || props.currentUserData.isLogged=="false"? 
                <div className="searchBar">
                    <input value={valueOfInput} onChange={(e)=>{setValueOfInput(e.target.value)}} type="text" placeholder="Search for questions by its keys, authors or titles..."/>
                    <button onClick={()=>{setKeyPhrase(valueOfInput); setValueOfInput(""); setIsQuestionDetails(false)}} className="searchBtn">Search</button>
                </div>
            : ""}


            <div className="mainContainer">
                {isQuestionDetails && !isAccountDetails && !isNewQuestion && !isVeryfing? 
                    <QuestionPage
                        questionInfo={currentQuestionDetails}
                        currentUserData={props.currentUserData}
                        answers={props.answers}
                        onRemoveAnswer={props.onRemoveAnswer}
                        onEditAnswer={props.onEditAnswer}
                        onCreateAnswer={props.onCreateAnswer}
                    />
                :""}
                
                
                {isAccountDetails && !isNewQuestion && !isQuestionDetails && !isVeryfing? 
                    <AccountDetails 
                        currentUserData={props.currentUserData}
                        questions={props.questions}
                        onChangeName={props.onChangeName}
                        onChangePass={props.onChangePass}
                        onRemoveQuestion={props.onRemoveQuestion}
                        onQuestionDetails={questionDetails}
                    />
                    :""}

                {!isQuestionDetails && !isAccountDetails && !isNewQuestion && !isVeryfing? 
                    <>
                        <div className="questions">
                            Questions: 
                            {props.questions.map((question)=>{
                                if (keyPhrase == ""){
                                    return <QuestionOnMain 
                                        questionInfo={question}
                                        onQuestionDetails={questionDetails}
                                        />
                                }else if (keyPhrase == question.ownerName || keyPhrase == question.ownerKey || keyPhrase == question.title || keyPhrase == question.questionKey || keyPhrase == question.content){
                                    return <QuestionOnMain 
                                        questionInfo={question}
                                        onQuestionDetails={questionDetails}
                                        />
                                }
                            })}
                        </div>

                        <div className="archievedQuestions">
                            Archieved Questions:
                            {props.archievedQuestions.map((question)=>{
                                if (keyPhrase == ""){
                                    return <QuestionOnMain 
                                        questionInfo={question}
                                        onQuestionDetails={questionDetails}
                                        />
                                }else if (keyPhrase == question.ownerName || keyPhrase == question.ownerKey || keyPhrase == question.title || keyPhrase == question.questionKey || keyPhrase == question.content){
                                    return <QuestionOnMain 
                                        questionInfo={question}
                                        onQuestionDetails={questionDetails}
                                        />
                                }
                            })}
                        </div>
                    </>
                : ""}


                {isVeryfing && !isNewQuestion && !isQuestionDetails && !isAccountDetails ?
                    <>
                    
                        {props.toVerifyUsers.map((user)=>{
                            return <PersonToVerify 
                                    personInfo={user} 
                                    onVerifying={props.onVerifying}
                                    />
                        })}
                    
                    </>
                : ""}

                {isNewQuestion && !isVeryfing && !isQuestionDetails && !isAccountDetails ? 
                    <QuestionCreator onCreateNewQuestion={props.onCreateNewQuestion}
                                    currentUserData={props.currentUserData}
                                    />
                
                : ""}
            </div>
        </>
    )
}