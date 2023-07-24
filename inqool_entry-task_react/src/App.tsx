import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import UserForm from './components/UserForm'
import UserInfo from './components/UserInfo'
import ReposList from './components/ReposList'
import OrgsList from './components/OrgsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
        <UserForm />
        <UserInfo />
        <ReposList />
        <OrgsList />
      <Footer />
    </>
  )
}

export default App
