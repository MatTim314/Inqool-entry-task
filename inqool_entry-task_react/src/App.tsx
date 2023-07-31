import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import UserForm from './components/UserForm'
import UserInfo from './components/UserInfo'
import ReposList from './components/ReposList'
import OrgsList from './components/OrgsList'
import User from "./types/User";

function App() {
  const [user, setUser] = useState({} as User);
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    listRepos: true,
    listOrgs: true
  });

  return (
    <>
      <Header />
      <UserForm setUser={setUser} setOptions={setOptions} setError={setError} />
      {user.username ? (
        <>
          <UserInfo user={user} />
          {options.listRepos && <ReposList />}
          {options.listOrgs && <OrgsList />}
        </>
      ) : (
           error  ? error : "Search for a user"
      )}
      
      <Footer />
    </>
  );
}

export default App
