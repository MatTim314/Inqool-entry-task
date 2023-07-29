import React from 'react'
import { List, ListItem } from '@chakra-ui/react'
import Organization from './Organization';


const orgs: string[] = [];

function getOrgs() {
  
}



function OrgsList() {
  const orgsList = orgs.map(org =>
  <ListItem>
    <Organization />
  </ListItem>)
  
  return (
    <List>
      <p>Orgs list</p>
      {orgsList}
    </List>
  )
}

export default OrgsList