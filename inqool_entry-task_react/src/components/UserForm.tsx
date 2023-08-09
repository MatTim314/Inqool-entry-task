import React from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  Box,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  border,
  Center
} from "@chakra-ui/react";
import { useState } from "react";
import { getUserData, getUserOrgs, getUserRepos } from '../services/fetcher';
import User from "../types/User";
import Repository from "../types/Repository";
import Organization from "../types/Organization";
import { useContext } from "react";
import { OnlineContext } from "../contexts/OnlineContext";
import { mockOrgsData, mockReposData, mockUser } from "../services/mockData";
import RecentSearch from "../types/RecentSearch";



interface UserFormProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  setOptions: React.Dispatch<
    React.SetStateAction<{
      listRepos: boolean;
      listOrgs: boolean;
    }>
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;

  searches: RecentSearch[];
  setSearches: React.Dispatch<React.SetStateAction<RecentSearch[]>>;
  setSelectedSearch: React.Dispatch<React.SetStateAction<RecentSearch>>
}




function UserForm({ setUser, setError, searches, setSearches, setSelectedSearch }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [checkedRepos, setCheckedRepos] = useState(false);
  const [checkedOrgs, setCheckedOrgs] = useState(false);
  const { toggleColorMode } = useColorMode();
  const onlineContext = useContext(OnlineContext);


  function handleClick(){
    if (searches.length > 0 && searches.find((search:RecentSearch): boolean => search.user.username.toUpperCase() == username.toUpperCase())){
      alert("already in the list")
      return;
    }
    fetchUser();
  }
  
  async function fetchUser() {

    let newSearch = {} as RecentSearch;

    setLoading(true);
    //setOptions({ listRepos: checkedRepos, listOrgs: checkedOrgs });
    newSearch.options = { listOrgs: checkedOrgs, listRepos: checkedRepos };

    if (!onlineContext) {
      newSearch.user = mockUser();
      newSearch.repositories = mockReposData();
      newSearch.organizations = mockOrgsData();

      //setUser(mockUser());
      //setRepositories(mockReposData());
      //setOrganizations(mockOrgsData());
      setLoading(false);
      return
    }

    await getUserData(username)
      .then((user: User) => {
        newSearch.user = user;
        newSearch.error = "";

        //setUser(user);
        setError("");
      })
      .then(async () => {
        if (checkedRepos) {
          await getUserRepos(username)
            .then((repositories: Repository[]) => {
              newSearch.repositories = repositories;
              // setRepositories(repositories);
            })
            .catch((error: Error) => {
              newSearch.error = `Repositories could not be fetched. Error: ${error.message}`

              setError(
                `Repositories could not be fetched. Error: ${error.message}`
              );
            });
        }
      })
      .then(async () => {
        if (checkedOrgs) {
          await getUserOrgs(username)
            .then((organizations: Organization[]) => {
              newSearch.organizations = organizations;
              // setOrganizations(organizations);
            })
            .catch((error: Error) => {
              newSearch.error = `Organizations could not be fetched. Error: ${error.message}`
              setError(
                `Organizations could not be fetched. Error: ${error.message}`
              );
            });
        }
      })
      .then(() => {
        if (searches.length > 4) {
          setSearches(
            [newSearch,
              ...searches
            ].slice(0,5)
          )
        }else{
          setSearches(
            [newSearch,
              ...searches
            ]
          )
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        setUser({} as User);
        if (username == "") {
          newSearch.error = `Username cannot be empty.`;
          // setError(`Username cannot be empty.`;
          return;
        }

        if (error.message.includes("404")) {
          newSearch.error = `Username does not exist.`;
          setError(`Username does not exist.`);
        } else {
          newSearch.error = `User could not be fetched. Error: ${error.message}`;
          setError(`User could not be fetched. Error: ${error.message}`);
        }
      })
      .finally(() => {
        setTimeout(
          () => {
            setError("")
          }, 5000
        )
        setSelectedSearch(newSearch);
        setLoading(false);
      });
  }


  return (
    <Flex direction="column" align="center" gap="1rem">
      <FormControl isRequired>
        <Center>
          <Input
            textAlign="center"
            width="40%"
            type="text"
            placeholder="Enter a username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></Input>
        </Center>
      </FormControl>
      <Button
        variant="solid"
        isLoading={loading}
        type="submit"
        onClick={handleClick}
        colorScheme="twitter"
      >
        Search
      </Button>
      <Box>
        <Flex direction="column">
          <Checkbox
            checked={checkedRepos}
            size="lg"
            spacing="1rem"
            onChange={() => setCheckedRepos(!checkedRepos)} // TODO: change to setOptions so the state gets updated correctly
          >
            List repositories
          </Checkbox>
          <Checkbox
            checked={checkedOrgs}
            size="lg"
            spacing="1rem"
            onChange={() => setCheckedOrgs(!checkedOrgs)}
          >
            List organizations
          </Checkbox>
        </Flex>
      </Box>

    </Flex>
  );
}

export default UserForm;
