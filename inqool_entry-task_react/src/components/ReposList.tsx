import Repository from "../types/Repository";
import {
  Box,
  Heading,
  Link,
  Text,
  ListItem,
  List,
  Button,
  Card,
  Badge,
  Tag,
} from "@chakra-ui/react";

interface MyComponentProps {
  repos: Repository[];
}

function ReposList({ repos }: MyComponentProps) {
  const listItems = repos.map((repo) => {
    return (
      <ListItem key={repo.name} pt='1rem'>
        <Card>
          <Heading size='lg'>
            <Link href={repo.url}>{repo.name}</Link>
          </Heading>
          <Text> {repo.description} </Text>
          <Text> Last update: {repo.updated_at}</Text>
          <Badge width='min-content'> {repo.language} </Badge>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(repo.ssh_url);
            }}
          >
            Clone
          </Button>
        </Card>
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}

export default ReposList;
