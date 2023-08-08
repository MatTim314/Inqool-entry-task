import React from 'react'
import { Avatar, Card, Heading, Link, list, List, ListItem, Text } from '@chakra-ui/react'
import Organization from '../types/Organization';


interface MyComponentProps {
  orgs: Organization[];
}

function OrganizationInfo(org: Organization) {
  return (
    <ListItem key={org.login}>
      <Card p="1rem" _hover={{
          outline: "1px var(--celadon) solid",
      
        }}>
      <Heading size='lg'>
        <Link href={org.html_url}>
        <Avatar src={org.avatar_url}></Avatar>
          {org.login}
        </Link>
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