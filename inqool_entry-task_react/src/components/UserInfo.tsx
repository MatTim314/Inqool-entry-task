import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import User from '../types/User';
import { Link } from "@chakra-ui/react";

interface MyComponentProps {
  user: User;
}

function UserInfo({ user }: MyComponentProps) {
  
  let bio : string = user.bio && `Bio: ${user.bio}`;
  let href: string = user.url;
  return (
    <Box>
      <Heading>
        <Link href={href} isExternal>
          {user.username}
        </Link>
      </Heading>
      <Avatar src={user.avatar_url} />
      <Text> {bio} </Text>
      <Text>Followers: {user.followers} </Text>
      <Text>Following: {user.following} </Text>
    </Box>
  );
}

export default UserInfo