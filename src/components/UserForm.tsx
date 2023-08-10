import React from "react";
import { FormControl, Input, Flex, Button, Center } from "@chakra-ui/react";
import { useState } from "react";
import { getUserData, getUserOrgs, getUserRepos } from "../services/fetcher";
import User from "../types/User";
import Repository from "../types/Repository";
import Organization from "../types/Organization";
import { useContext } from "react";
import { OnlineContext } from "../contexts/OnlineContext";
import { mockOrgsData, mockReposData, mockUser } from "../services/mockData";
import RecentSearch from "../types/RecentSearch";
import { ErrorMessages } from "./ErrorMessages";

interface UserFormProps {
  setError: React.Dispatch<React.SetStateAction<string>>;

  searches: RecentSearch[];
  setSearches: React.Dispatch<React.SetStateAction<RecentSearch[]>>;
  setSelectedSearch: React.Dispatch<React.SetStateAction<RecentSearch>>;
}

function UserForm({
  setError,
  searches,
  setSearches,
  setSelectedSearch,
}: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const onlineContext = useContext(OnlineContext);

  function handleSubmit() {
    if (
      searches.length > 0 &&
      searches.find(
        (search: RecentSearch): boolean =>
          search.user.username.toUpperCase() == username.toUpperCase()
      )
    ) {
      setError(ErrorMessages.userInRecent);
      return;
    }
    fetchUser();
  }

  async function fetchUser() {
    const newSearch = {} as RecentSearch;

    setLoading(true);

    if (!onlineContext) {
      newSearch.user = mockUser();
      newSearch.repositories = mockReposData();
      newSearch.organizations = mockOrgsData();

      setLoading(false);
      return;
    }

    await getUserData(username)
      .then((user: User) => {
        newSearch.user = user;
        newSearch.error = "";

        setError("");
      })
      .then(async () => {
        await getUserRepos(username)
          .then((repositories: Repository[]) => {
            newSearch.repositories = repositories;
            // setRepositories(repositories);
          })
          .catch((error: Error) => {
            newSearch.error = `${ErrorMessages.reposUnknown} ${error.message}`;

            setError(`${ErrorMessages.reposUnknown} ${error.message}`);
          });
      })
      .then(async () => {
        await getUserOrgs(username)
          .then((organizations: Organization[]) => {
            newSearch.organizations = organizations;
            // setOrganizations(organizations);
          })
          .catch((error: Error) => {
            newSearch.error = `${ErrorMessages.orgsUnknown} ${error.message}`;
            setError(`${ErrorMessages.orgsUnknown} ${error.message}`);
          });
      })
      .then(() => {
        if (searches.length > 4) {
          setSearches([newSearch, ...searches].slice(0, 5));
        } else {
          setSearches([newSearch, ...searches]);
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
        if (username == "") {
          newSearch.error = `${ErrorMessages.emptyUsername}`;
          // setError(`Username cannot be empty.`;
          return;
        }

        if (error.message.includes("404")) {
          newSearch.error = ErrorMessages.noSuchUser;
          setError(ErrorMessages.noSuchUser);
        } else {
          newSearch.error = `${ErrorMessages.userUnknown} ${error.message}`;
          setError(`${ErrorMessages.userUnknown} ${error.message}`);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setError("");
        }, 5000);
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
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
          ></Input>
        </Center>
      </FormControl>
      <Button
        variant="solid"
        isLoading={loading}
        type="submit"
        onClick={handleSubmit}
        colorScheme="twitter"
      >
        Search
      </Button>
    </Flex>
  );
}

export default UserForm;
