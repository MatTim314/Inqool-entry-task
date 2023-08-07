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
  border
} from "@chakra-ui/react";
import { useState } from "react";
import { getUserData, getUserOrgs, getUserRepos } from '../services/fetcher';
import User from "../types/User";
import Repository from "../types/Repository";
import Organization from "../types/Organization";



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


  async function fetchUser() {
    setLoading(true);
    setOptions({ listRepos: checkedRepos, listOrgs: checkedOrgs });
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
    <FormControl isRequired>
      <Flex direction="column" align="center" gap="1rem">
        <Input
          textAlign="center"
          width="40%"
          type="text"
          placeholder="Enter a username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></Input>
        <Box>
          <Flex direction="column">
            <Checkbox
              checked={checkedRepos}
              size="lg"
              spacing="1rem"
              onChange={() => setCheckedRepos(!checkedRepos)}
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
          isLoading={loading}
          type="submit"
          onClick={fetchUser}
          bg="picton_blue"
          color='seasalt'
          border='var(--picton-blue) 1px solid'
          _hover={{
            color: "picton_blue",
            bg: useColorModeValue('white', 'gunmetal'),
            border: "1px picton_blue solid"
          }}
        >
          Search
        </Button>
      </Flex>
    </FormControl>
  );
}

export default UserForm;
