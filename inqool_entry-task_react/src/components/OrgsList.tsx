import React from 'react'
import { Avatar, Card, Heading, list, List, ListItem, Text } from '@chakra-ui/react'
import Organization from '../types/Organization';


interface MyComponentProps {
  orgs: Organization[];
}

function OrganizationInfo(org: Organization) {
  return (
    <ListItem key={org.login}>
      <Card>
      <Heading size='lg'>
        <Avatar src={org.avatar_url}></Avatar>
        {org.login}
      </Heading>
      <Text>{org.description}</Text>

        
      </Card>
    </ListItem>
  );
  
}

function OrgsList({orgs} : MyComponentProps) {
  const listItems = orgs.map((org) => OrganizationInfo(org));

  
  return (
    <List>
      {listItems}
    </List>
  )
}

export default OrgsList