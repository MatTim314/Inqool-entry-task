import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import UserForm from './components/UserForm'
import UserInfo from './components/UserInfo'
import ReposList from './components/ReposList'
import OrgsList from './components/OrgsList'
import User from "./types/User";
import Repository from './types/Repository'
import Organization from './types/Organization'

function App() {
  const [user, setUser] = useState({} as User);
  const [repositories, setRepositories] = useState([] as Repository[])
  const [organizations, setOrganizatons] = useState([] as Organization[])
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    listRepos: true,
    listOrgs: true
  });

  return (
    <>
      <Header />
      <UserForm setUser={setUser} setOptions={setOptions} setError={setError} setRepositories={setRepositories} setOrganizations={setOrganizatons} />
      {user.username ? (
        <>
          <UserInfo user={user} />
          {options.listRepos && <ReposList repos={repositories} />}
          {options.listOrgs && <OrgsList orgs={organizations} />}
        </>
      ) : (
           error  ? error : "Search for a user"
      )}
      
      <Footer />
    </>
  );
}

export default App
