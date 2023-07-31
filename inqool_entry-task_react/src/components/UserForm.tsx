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
} from "@chakra-ui/react";
import { useState } from "react";
import { getUserData } from '../services/fetcher';
import User from "../types/User";



interface UserFormProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setOptions: React.Dispatch<
    React.SetStateAction<{
      listRepos: boolean;
      listOrgs: boolean;
    }>
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
}




function UserForm({ setUser, setOptions, setError } : UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [checkedRepos, setCheckedRepos] = useState(false);
  const [checkedOrgs, setCheckedOrgs] = useState(false);


  async function fetchUser() {
    setLoading(true);
    setOptions({ listRepos: checkedRepos, listOrgs: checkedOrgs });
    await getUserData(username)
      .then(
        (user: User) => {
          setUser(user);
          setError('');
        }
      )
      .catch(
      (error : Error) => {
          console.log(error.message);
          setUser({} as User);
          if (username === "") {
            setError(
              `Username cannot be empty.`
            );
          }
          
          if (error.message.includes("404")) {
            setError(`Username does not exist.`); 
          }
          else {
            setError(`User could not be fetched. Error: ${error.message}`);
          }
        })
      .finally(
        () => {
          setLoading(false);
        }
      );
  }


  return (
    <FormControl isRequired>
      <FormLabel>Username</FormLabel>
      <Input
        type="text"
        placeholder="Enter a username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></Input>

      <Checkbox
        checked={checkedRepos}
        size="lg"
        spacing="1rem"
        onChange={() => setCheckedRepos(!checkedRepos)}
      >
        List projects
      </Checkbox>
      <Checkbox
        checked={checkedOrgs}
        size="lg"
        spacing="1rem"
        onChange={() => setCheckedOrgs(!checkedOrgs)}
      >
        List organizations
      </Checkbox>

      {loading ? (
        <Button isLoading type="submit" onClick={fetchUser}>
          Search
        </Button>
      ) : (
        <Button type="submit" onClick={fetchUser} onSubmit={fetchUser}>
          Search
        </Button>
      )}
    </FormControl>
  );
}

export default UserForm;
