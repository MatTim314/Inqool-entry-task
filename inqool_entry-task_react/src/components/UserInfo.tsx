import { Avatar, Box, Card, CardBody, CardHeader, Center, Flex, Grid, GridItem, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import User from '../types/User';
import Options from '../types/Options';
import { Link } from "@chakra-ui/react";
import { SelectedCardContext } from '../contexts/SelectedCardContext';

interface MyComponentProps {
  user: User;
  repCount: number;
  orgCount: number;
  options: Options;
}

function UserInfo({ user, repCount, orgCount, options }: MyComponentProps) {

  let bio: string = user.bio && `Bio: ${user.bio}`;
  let href: string = user.url;
  let selectedCard = useContext(SelectedCardContext);
  let outline = selectedCard.user == user ? '1px var(--picton-blue) solid' : ''


  return (
    <Center>
      <Card minW={20} shadow='md' _hover={{
        outline: `1px var(--picton-blue) solid`,
        cursor: 'pointer'
      }}
        outline={outline}
      >
        <CardHeader>
          <Heading >
            <Link href={href} isExternal>
              <Flex direction='column' placeItems='center'>
                <Avatar src={user.avatar_url} />
                {user.username}

              </Flex>
            </Link>
          </Heading>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3} mb="1rem"> {bio} </Text>
          <Grid templateColumns="repeat(2,1fr)" templateRows="repeat(2,1fr)">
            <GridItem>
              <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber>{user.followers}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>Following</StatLabel>
                <StatNumber>{user.following}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>
              <Stat>
                <StatLabel>Repositories</StatLabel>
                <StatNumber>{user.public_repos_count}</StatNumber>
              </Stat>
            </GridItem>
            <GridItem>

              <Stat>
                <StatLabel>Organizations</StatLabel>
                <StatNumber>{user.orgs_count} </StatNumber>
              </Stat>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Center>
  );
}

export default UserInfo