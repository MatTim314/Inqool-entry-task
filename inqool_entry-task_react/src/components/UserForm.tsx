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
}




function UserForm({ setUser, setRepositories, setOrganizations, setOptions, setError } : UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [checkedRepos, setCheckedRepos] = useState(false);
  const [checkedOrgs, setCheckedOrgs] = useState(false);
  const { toggleColorMode } = useColorMode();
  const onlineContext = useContext(OnlineContext);

  async function fetchUser() {
    
    setLoading(true);
    setOptions({ listRepos: checkedRepos, listOrgs: checkedOrgs });

    if (!onlineContext){
      setUser(mockUser());
      setRepositories(mockReposData());
      setOrganizations(mockOrgsData());
      setLoading(false);
      return
    }

    await getUserData(username)
      .then((user: User) => {
        setUser(user);
        setError("");
      })
      .then(async () => {
        if (checkedRepos) {
          await getUserRepos(username)
            .then((repositories: Repository[]) => {
              setRepositories(repositories);
            })
            .catch((error: Error) => {
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
              setOrganizations(organizations);
            })
            .catch((error: Error) => {
              setError(
                `Organizations could not be fetched. Error: ${error.message}`
              );
            });
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        setUser({} as User);
        if (username == "") {
          setError(`Username cannot be empty.`);
          return;
        } 

        if (error.message.includes("404")) {
          setError(`Username does not exist.`);
        } else {
          setError(`User could not be fetched. Error: ${error.message}`);
        }
      })
      .finally(() => {
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

        <Button
        variant="solid"
          isLoading={loading}
          type="submit"
          onClick={fetchUser}
          colorScheme="twitter"
        >
          Search
        </Button>
      </Flex>
  );
}

export default UserForm;
