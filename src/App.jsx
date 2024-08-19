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
    userKey: crypto.randomUUID(),
    isAdmin:"true",
  }
]


function App() {
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [isRegisterPage, setIsRegisterPage] = useState(false)
  const [isMainPage, setIsMainPage] = useState(false)

  let [users, setUsers] = useState(initialUsers)
  let [currentUserData, setCurrentUserData] = useState({isLogged: "false"})


  const changeToLoginPage = () => {setIsLoginPage(true)}

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
                                                        users={users}/>
      : ""}

      {isRegisterPage && !isMainPage && !isLoginPage ? <RegisterPage/> 
      : ""}

  
    </>
  )
}

export default App
