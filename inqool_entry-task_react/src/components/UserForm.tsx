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
}




function UserForm({ setUser, setOptions } : UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [checkedRepos, setCheckedRepos] = useState(false);
  const [checkedOrgs, setCheckedOrgs] = useState(false);


  async function fetchUser() {
    setLoading(true);
    setOptions({ listRepos: checkedRepos, listOrgs: checkedOrgs });
    const user: User = await getUserData(username);
    // TODO: Catch error
    setLoading(false);
    setUser(user);
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
        <Button type="submit" onClick={fetchUser}>
          Search
        </Button>
      )}
    </FormControl>
  );
}

export default UserForm;
