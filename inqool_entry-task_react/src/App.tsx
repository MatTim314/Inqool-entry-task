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
  Skeleton,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
} from "@chakra-ui/react";
function App() {
  const [user, setUser] = useState({} as User);
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
    <>
      <Box>
        <Header />
        <Button pos="absolute" top="5px" right="5px" onClick={toggleColorMode}>
          {colorMode === "light" ? "🌑" : "☀"}
        </Button>
        <UserForm
          setUser={setUser}
          setOptions={setOptions}
          setError={setError}
          setRepositories={setRepositories}
          setOrganizations={setOrganizatons}
        />

        {user.username ? (
          <>
            <UserInfo
              user={user}
              repCount={repositories.length}
              orgCount={organizations.length}
            />
            <Grid templateColumns = {gridSize} gap={6}>
              <GridItem>
                
                {options.listRepos && 
                <>
                    <Heading size="2xl">Repositories</Heading>
                    <ReposList repos={repositories}/>
                  </>
                }
              </GridItem>
              <GridItem>
                
                {options.listOrgs &&
                  <>
                  <Heading size="2xl">Organizations</Heading>
                  <OrgsList orgs={organizations} />
                  </>
                }
                  
              </GridItem>
            </Grid>
          </>
        ) : error ? (
          <Center>
            <Alert
              status="error"
              w="50%"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Center>
        ) : (
          ""
        )}
      </Box>
      <Footer />
    </>
  );
}

export default App
