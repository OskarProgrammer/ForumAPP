import { useState } from 'react'
import { WelcomePage } from './components/WelcomePage/WelcomePage'
import { LoginPage } from './components/LoginPage/LoginPage'
import { MainPage } from './components/MainPage/MainPage'
import { RegisterPage } from './components/RegisterPage/RegisterPage'
import './App.css'

const initialUsers = [
  {
    name: "Oskar",
    password: "root",
    userKey: 1,
    isAdmin:"true",
  }
]

const initialToVerify = [

]

const initialQuestions = [
  {
    ownerName: "Oskar",
    ownerKey: 1,
    title: "Pierwsze pytanie",
    content: "Text",
    questionKey: 2,
    isEditted: "false",
  }
]

const initialAnswers = [
  {
    answerKey: crypto.randomUUID(),
    ownerKey: 1,
    questionKey: 2,
    ownerName: "Oskar",
    content: "Jakas odpowidsadsadadsadasdsadasdsadadsadsadasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdsadasdasdasdasedz",
    isEditted: "false",
  }
]


function App() {
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [isRegisterPage, setIsRegisterPage] = useState(false)
  const [isMainPage, setIsMainPage] = useState(false)

  let [users, setUsers] = useState(initialUsers)
  let [currentUserData, setCurrentUserData] = useState({isLogged: "false"})
  let [toVerifyUsers, setToVerifyUsers] = useState(initialToVerify)
  let [questions, setQuestions] = useState(initialQuestions)
  let [answers, setAnswers] = useState(initialAnswers)


  const changeToLoginPage = () => {setIsLoginPage(true); setIsMainPage(false);}

  const loginToAccount = (login, password) => {
      users.map((user)=>{
        if(login == user.name && password == user.password){
          console.log("zalogowano");
          currentUserData = user
          currentUserData.isLogged = "true"

          setCurrentUserData(currentUserData)
          setIsMainPage(true)
          setIsLoginPage(false)
        }
      })
  }

  const logOut = () => {
    currentUserData = {isLogged: "false"}
    setCurrentUserData(currentUserData)
  }

  const addAccount = (login, password, isAdmin) => {
    if (isAdmin) {
      let newAdminAccount = {
        name: login,
        password: password,
        userKey: crypto.randomUUID(),
        isAdmin: "true",
      }

      toVerifyUsers = [...toVerifyUsers, newAdminAccount]
      setToVerifyUsers(toVerifyUsers) 
    }else{
      let newUser = {
        name: login,
        password: password,
        userKey: crypto.randomUUID(),
        isAdmin: "false"
      }

      users = [...users, newUser]
      setUsers(users)
    }

    setIsRegisterPage(false)
    setIsMainPage(true)
  
  }


  const changeName = (newName, userKey) => {
    let newUsers = []

    users.map((user)=>{
      if (user.userKey === userKey){
        user.name = newName

        currentUserData = user
        currentUserData.isLogged = "true"
      }
      newUsers.push(user)
    })

    setCurrentUserData(currentUserData)
    setUsers(newUsers)
  }

  const changePass = (newPass, userKey) => {
    let newUsers = []

    users.map((user)=>{
      if (user.userKey === userKey){
        user.password = newPass

        currentUserData = user
        currentUserData.isLogged = "true"
      }
      newUsers.push(user)
    })

    setCurrentUserData(currentUserData)
    setUsers(newUsers)
  }

  const removeQuestion = (questionInfo) => {
    let newQuestions = []

    questions.map((question)=>{
      if (question.questionKey != questionInfo.questionKey) {
        newQuestions.push(question)  
      }
    })

    questions = newQuestions
    setQuestions(questions)
  }

  const removeAnswer = (answerInfo) => {
    let newAnswers = []

    answers.map((answer)=>{
      if (answer.answerKey != answerInfo.answerKey) {
        newAnswers.push(answer)
      }
    })

    answers = newAnswers
    setAnswers(answers)
  }


  const editAnswer = (answerInfo, newAnswer) => {
    let newAnswers = []

    answers.map((answer)=>{
      if (answer.answerKey == answerInfo.answerKey) {
        answer.content = newAnswer
        answer.isEditted = "true"
      }
      newAnswers.push(answer)
    })

    answers=newAnswers
    setAnswers(answers)
  }

  return (
    <>

      {!isLoginPage && !isRegisterPage && !isMainPage ? <WelcomePage 
                                                        onLoginPage={changeToLoginPage}
                                                        onGuest={()=>{setIsMainPage(true)}}/> 
      : ""}

      {isLoginPage && !isRegisterPage && !isMainPage ? <LoginPage 
                                                        onLogin={loginToAccount}
                                                        onRegisterForm={()=>{setIsRegisterPage(true); setIsLoginPage(false)}}/> 
      : ""}

      {isMainPage && !isLoginPage && !isRegisterPage ? <MainPage
                                                        currentUserData={currentUserData}
                                                        users={users}
                                                        questions={questions}
                                                        answers={answers}
                                                        toVerifyUsers={toVerifyUsers}
                                                        onLogin={changeToLoginPage}
                                                        onLogOut={logOut}
                                                        onChangeName={changeName}
                                                        onChangePass={changePass}
                                                        onRemoveQuestion={removeQuestion}
                                                        onRemoveAnswer={removeAnswer}
                                                        onEditAnswer={editAnswer}
                                                        />
      : ""}

      {isRegisterPage && !isMainPage && !isLoginPage ? <RegisterPage
                                                        onLoginForm={()=>{setIsLoginPage(true)
                                                          setIsRegisterPage(false)}}
                                                        onRegister={addAccount}
                                                        /> 
      : ""}

  
    </>
  )
}

export default App
