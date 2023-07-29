import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import User from '../types/User';

interface MyComponentProps {
  user: User;
}

function UserInfo({user} : MyComponentProps) {
  return (
    <Box>
      <Heading>{user.username}</Heading>
      <Avatar src={user.avatar_url} />
          <Text>Bio: {user.bio} </Text>
          <Text>Followers: {user.followers} </Text>
          <Text>Following: {user.following} </Text>
    </Box>
    )
}

export default UserInfo