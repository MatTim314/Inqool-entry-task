import { useState, useContext, createContext, Context, useEffect } from 'react'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import UserForm from './components/UserForm'
import UserInfo from './components/UserInfo'
import ReposList from './components/ReposList'
import OrgsList from './components/OrgsList'

// Types
import User from "./types/User";
import Repository from './types/Repository'
import Organization from './types/Organization'
import RecentSearch from './types/RecentSearch'

// Contexts
import { OnlineContext } from './contexts/OnlineContext'
import { SelectedCardContext } from './contexts/SelectedCardContext'

// UI
import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Skeleton,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ThemeContext } from '@emotion/react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import RecentSearchesCards from './components/RecentSearchesCards'
import ErrorNotification from './components/ErrorNotification'

function App() {
  const [online, setOnline] = useState(true);
  
  const [recentSearches, setRecentSearches] = useState([] as RecentSearch[])
  // TODO: Move user, repos, orgs into a single search and derive information from that
  const [user, setUser] = useState({} as User);
  const [selectedSearch, setSelectedSearch] = useState({} as RecentSearch);
  const [repositories, setRepositories] = useState([] as Repository[])
  const [organizations, setOrganizatons] = useState([] as Organization[])
  const [error, setError] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const [options, setOptions] = useState({
    listRepos: true,
    listOrgs: true
  });

  let gridItems: number = Number(options.listOrgs) + Number(options.listRepos);
  let gridSize: string = `repeat(${gridItems}, 1fr)`;
  

  return (
    <OnlineContext.Provider value={online}> 
      <Box>
        {selectedSearch.user ? 
          `Selected user: ${selectedSearch.user.username}`
          :
          `No selected user`
        }
        
        <Header />
        <Button pos="absolute" top="4rem" right="1rem" onClick={() => {setOnline(!online)}}>
          {online ? "online" : "offline"}
          </Button>
        <Button pos="absolute" top="1rem" right="1rem" onClick={toggleColorMode}>
          {colorMode === "light" ? "🌑" : "☀"}
        </Button>
        
        <UserForm
          setUser={setUser}
          setOptions={setOptions}
          setError={setError}
          setRepositories={setRepositories}
          setOrganizations={setOrganizatons}

          searches={recentSearches}
          setSearches={setRecentSearches}
          setSelectedSearch={setSelectedSearch}
        />


        {error && <ErrorNotification error={error}/>}

        {recentSearches.length > 0 &&
        <>
        <Divider mt={3}/>
        <Center>
          <Heading size="lg" color="picton_blue" m='2rem'>
            Recent searches
          </Heading>
        </Center>
        <SelectedCardContext.Provider value={selectedSearch}>
          <RecentSearchesCards recentSearches={recentSearches} setSelectedSearch={setSelectedSearch}/>
        </SelectedCardContext.Provider>
        </>
      }

      <Divider m={5} />
        {recentSearches.length > 0 ? (
          <>
            <Grid templateColumns = {gridSize} gap={6} justifyItems='center'>
              <GridItem>
                
                {options.listRepos && 
                <>
                <Center>

                    <Heading size="2xl" color="cyclamen">Repositories</Heading>
                </Center>
                    <ReposList repos={repositories}/>
                  </>
                }
              </GridItem>
              <GridItem>
                
                {options.listOrgs &&
                  <>
                  <Heading size="2xl" color="celadon">Organizations</Heading>
                  {organizations.length > 0 
                    ? <OrgsList orgs={organizations} /> 
                    : <Text>User is not a part of any organization</Text>
                  }
                  </>
                } 
                  
              </GridItem>
            </Grid>
          </>
        ) : 
          ""
        }
      </Box>

      <Footer />

    </OnlineContext.Provider>
  );
}

export default App
