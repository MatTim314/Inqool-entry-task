import { Avatar, Box, Card, CardBody, CardHeader, Center, Flex, Grid, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import React from 'react'
import User from '../types/User';
import { Link } from "@chakra-ui/react";

interface MyComponentProps {
  user: User;
  repCount: number;
  orgCount: number;
}

function UserInfo({ user, repCount = -1, orgCount = -1 }: MyComponentProps) {
  
  let bio : string = user.bio && `Bio: ${user.bio}`;
  let href: string = user.url;
  return (
    <Center>
      <Card width="25%" m="1rem">
        <CardHeader>
          <Heading>
            <Link href={href} isExternal>
              <Avatar mr="1rem" src={user.avatar_url} />
              {user.username}
            </Link>
          </Heading>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3}> {bio} </Text>
          <Grid templateColumns="repeat(2,1fr)" templateRows="repeat(2,1fr)">
            <Stat>
              <StatLabel>Followers</StatLabel>
              <StatNumber>{user.followers}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Following</StatLabel>
              <StatNumber>{user.following}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Repositories</StatLabel>
              <StatNumber>{repCount > -1 ? repCount : "-"}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Organizations</StatLabel>
              <StatNumber>{orgCount > -1 ? orgCount : "-"}</StatNumber>
            </Stat>
          </Grid>
        </CardBody>
      </Card>
    </Center>
  );
}

export default UserInfo