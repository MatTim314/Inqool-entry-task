import { Avatar, Card, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import Organization from '../types/Organization';


interface MyComponentProps {
  orgs: Organization[];
}

function OrganizationInfo(org: Organization) {
  return (
    <ListItem key={org.login} p='1rem'>
      <Card 
      boxShadow='lg'
      p='1rem'
      _hover={{
          outline: "1px var(--celadon) solid",
      
        }}>
      <Flex direction="column" justify="center" align="center" gap='1rem'>
      <Heading size='lg'>
        <Link href={org.html_url}>
          <Flex direction='row' gap='1rem' align='center'>
            <Avatar src={org.avatar_url}></Avatar>
            <Text>
              {org.login}
            </Text>
          </Flex>
        </Link>
      </Heading>
      {org.description && 
      <Text>{org.description}</Text>
      }

     </Flex>   
      </Card>
    </ListItem>
  );
  
}

function OrgsList({orgs} : MyComponentProps) {
  const listItems = orgs.map((org) => OrganizationInfo(org));

  
  return (
    <List spacing={2}>
      {listItems}
    </List>
  )
}

export default OrgsList