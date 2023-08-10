import { Avatar, Card, CardBody, CardHeader, Center, Flex, Grid, GridItem, Heading, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import User from '../types/User';
import { Link } from "@chakra-ui/react";
import { SelectedCardContext } from '../contexts/SelectedCardContext';

interface MyComponentProps {
  user: User;
}

function UserInfo({ user }: MyComponentProps) {

  const bio: string = user.bio && `Bio: ${user.bio}`;
  const href: string = user.url;
  const selectedCard = useContext(SelectedCardContext);
  const outline = selectedCard.user == user ? '1px var(--picton-blue) solid' : ''


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