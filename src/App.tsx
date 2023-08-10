import { useState, useContext, createContext, Context, useEffect } from "react";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserForm from "./components/UserForm";
import UserInfo from "./components/UserInfo";
import ReposList from "./components/ReposList";
import OrgsList from "./components/OrgsList";

// Types
import User from "./types/User";
import Repository from "./types/Repository";
import Organization from "./types/Organization";
import RecentSearch from "./types/RecentSearch";

// Contexts
import { OnlineContext } from "./contexts/OnlineContext";
import { SelectedCardContext } from "./contexts/SelectedCardContext";

// UI
import {
  Box,
  Button,
  Center,
  Checkbox,
  Collapse,
  Divider,
  Fade,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import RecentSearchesCards from "./components/RecentSearchesCards";
import ErrorNotification from "./components/ErrorNotification";
import Options from "./types/Options";

function App() {
  const DEBUG: boolean = false;
  const [online, setOnline] = useState(true);

  const [recentSearches, setRecentSearches] = useState([] as RecentSearch[]);
  // TODO: Move user, repos, orgs into a single search and derive information from that
  const [user, setUser] = useState({} as User);
  const [selectedSearch, setSelectedSearch] = useState({} as RecentSearch);
  const [repositories, setRepositories] = useState([] as Repository[]);
  const [organizations, setOrganizatons] = useState([] as Organization[]);
  const [error, setError] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const [options, setOptions] = useState({} as Options);

  let gridItems: number = Number(options.listOrgs) + Number(options.listRepos);
  let gridSize: string = `repeat(${gridItems}, 1fr)`;

  return (
    <OnlineContext.Provider value={online}>
      <Box>
        <Header />
        {DEBUG && (
          <Button
            pos="absolute"
            top="4rem"
            right="1rem"
            onClick={() => {
              setOnline(!online);
            }}
          >
            {online ? "online" : "offline"}
          </Button>
        )}
        <Button
          pos="absolute"
          top="1rem"
          right="1rem"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? "🌑" : "☀"}
        </Button>

        <UserForm
          setUser={setUser}
          options={options}
          setOptions={setOptions}
          setError={setError}
          setRepositories={setRepositories}
          setOrganizations={setOrganizatons}
          searches={recentSearches}
          setSearches={setRecentSearches}
          setSelectedSearch={setSelectedSearch}
        />

        {error && <ErrorNotification error={error} />}

        <Box position="relative">
          <Collapse in={recentSearches.length > 0}>
            <Divider mt={3} />
            <Center>
              <Heading size="lg" color="picton_blue" m="2rem">
                Recent searches
              </Heading>
              <Box>
                <Menu>
                  <MenuButton
                    aria-label="options"
                    as={IconButton}
                    icon={<ChevronDownIcon />}
                  />
                  <MenuList>
                    <MenuItem
                      icon={<DeleteIcon />}
                      aria-label="Clear searches"
                      onClick={() => {
                        setRecentSearches([]);
                      }}
                    >
                      Clear searches
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Center>
            <SelectedCardContext.Provider value={selectedSearch}>
              <RecentSearchesCards
                recentSearches={recentSearches}
                setSelectedSearch={setSelectedSearch}
              />
            </SelectedCardContext.Provider>
            <Center p="1rem">
              <Flex direction="column">
                <Checkbox
                  checked={options.listRepos}
                  colorScheme="twitter"
                  color={options.listRepos ? "cyclamen" : ""}
                  size="lg"
                  spacing="1rem"
                  onChange={() => {
                    setOptions({ ...options, listRepos: !options.listRepos });
                  }}
                >
                  List repositories
                </Checkbox>
                <Checkbox
                  checked={options.listOrgs}
                  colorScheme="twitter"
                  color={options.listOrgs ? "celadon" : ""}
                  size="lg"
                  spacing="1rem"
                  onChange={() => {
                    setOptions({ ...options, listOrgs: !options.listOrgs });
                  }}
                >
                  List organizations
                </Checkbox>
              </Flex>
            </Center>
          </Collapse>
        </Box>

        {recentSearches.length > 0 ? (
          <>
            <Divider m={5} />
            <Grid templateColumns={gridSize} gap={6} justifyItems="center">
              <GridItem>
                <Collapse in={options.listRepos} animateOpacity>
                  {options.listRepos && (
                    <>
                      {selectedSearch.repositories ? (
                        <>
                          <Center>
                            <Heading size="2xl" color="cyclamen">
                              Repositories
                            </Heading>
                          </Center>
                          <ReposList repos={selectedSearch.repositories} />
                        </>
                      ) : (
                        <Heading size="sm" fontStyle="italic" mt="1rem">
                          User does not have any repositories
                        </Heading>
                      )}
                    </>
                  )}
                </Collapse>
              </GridItem>

              <GridItem>
                <Collapse in={options.listOrgs} animateOpacity>
                  {options.listOrgs && (
                    <>
                      {selectedSearch.organizations ? (
                        <>
                          <Center>
                            <Heading size="2xl" color="celadon">
                              Organizations
                            </Heading>
                          </Center>
                          {selectedSearch.organizations &&
                          selectedSearch.organizations.length > 0 ? (
                            <OrgsList orgs={selectedSearch.organizations} />
                          ) : (
                            <Heading size="sm" fontStyle="italic" mt="1rem">
                              User is not a part of any organization
                            </Heading>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </Collapse>
              </GridItem>
            </Grid>
          </>
        ) : (
          ""
        )}
      </Box>

      <Footer />
    </OnlineContext.Provider>
  );
}

export default App;
