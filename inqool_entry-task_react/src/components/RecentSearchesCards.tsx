import * as React from 'react';
import RecentSearch from '../types/RecentSearch';
import { Box, GridItem, HStack, List, ListItem, SimpleGrid } from '@chakra-ui/react';
import UserInfo from './UserInfo';

interface ComponentProps{
    recentSearches: RecentSearch[],
    setSelectedSearch: React.Dispatch<React.SetStateAction<RecentSearch>>;
    
}

function RecentSearchesCards({recentSearches, setSelectedSearch} : ComponentProps) {

    const searchesGrid = recentSearches.map(
        (search : RecentSearch) =>
          <GridItem key={search.user.username} onClick={() => setSelectedSearch(search)}>
              <UserInfo     
                user={search.user}
                repCount={search.user.followers}
                orgCount={search.user.followers}
                options={search.options}
              />
          </GridItem>
        )

    return ( <>
    <SimpleGrid minChildWidth='20%' textAlign="center" rowGap="0px">
        {searchesGrid}
    </SimpleGrid>
    </>);
}

export default RecentSearchesCards;