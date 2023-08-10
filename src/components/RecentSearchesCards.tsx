import * as React from "react";
import RecentSearch from "../types/RecentSearch";
import { Fade, GridItem, SimpleGrid } from "@chakra-ui/react";
import UserInfo from "./UserInfo";

interface ComponentProps {
  recentSearches: RecentSearch[];
  setSelectedSearch: React.Dispatch<React.SetStateAction<RecentSearch>>;
}

function RecentSearchesCards({
  recentSearches,
  setSelectedSearch,
}: ComponentProps) {
  const searchesGrid = recentSearches.map((search: RecentSearch) => (
    <GridItem
      key={search.user.username}
      onClick={() => setSelectedSearch(search)}
    >
      <Fade in={true}>
        <UserInfo user={search.user} />
      </Fade>
    </GridItem>
  ));

  return (
    <>
      <SimpleGrid minChildWidth="20%" textAlign="center" rowGap="0px">
        {searchesGrid}
      </SimpleGrid>
    </>
  );
}

export default RecentSearchesCards;
