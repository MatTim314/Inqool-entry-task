import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import UserForm from './components/UserForm'
import UserInfo from './components/UserInfo'
import ReposInfo from './components/ReposInfo'
import OrgInfo from './components/OrgInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />

      <UserForm />
      <UserInfo />
      <ReposInfo />
      <OrgInfo />
      
      <Footer />
    </>
  )
}

export default App
