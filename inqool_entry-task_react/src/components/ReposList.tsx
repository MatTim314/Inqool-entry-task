import React, { useEffect, useState } from 'react'
import { getUserRepos } from "../services/fetcher";
import User from '../types/User';
import Repository from '../types/Repository'
import { Box, Heading, Link, Text, ListItem, List, Button, useClipboard, Card } from '@chakra-ui/react';

interface MyComponentProps {
  repos: Repository[];
}

function RepositoryInfo(repo: Repository) {
  const { onCopy, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    setValue(repo.ssh_url);
  }, []);

  let href : string = repo.url;
  let description: string = repo.description ? `Description: ${repo.description}` : ""
  let language: string = repo.language ? `Language: ${repo.language}` : ""
  
  return (
      <ListItem key={repo.name}>
        <Card>
          <Heading>
            <Link href={href}>{repo.name}</Link>
          </Heading>
          <Text> {description} </Text>
          <Text> Last update: {repo.updated_at}</Text>
          <Text> {language} </Text>
          <Button onClick={onCopy}> {hasCopied ? "Copied!" : "Clone"} </Button>
        </Card>
      </ListItem>
  );
}


function ReposList({ repos }: MyComponentProps) {
  
  const listItems = repos.map((repo) => RepositoryInfo(repo));

  return (
    <List>
      {listItems}
    </List>
  )
}

export default ReposList