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
  Center,
  Flex
} from "@chakra-ui/react";

interface MyComponentProps {
  repos: Repository[];
}

function ReposList({ repos }: MyComponentProps) {
  const listItems = repos.map((repo) => {
    return (
      <ListItem key={repo.name} pt='1rem' >
        <Card p='1rem' _hover={{
          outline: "1px var(--cyclamen) solid",
      
        }} >
          <Flex direction="column" justify="center" align="center" gap='0.5rem'>


          <Heading size='lg'>
            <Link href={repo.url}>{repo.name}</Link>
          </Heading>
          <Text fontStyle='italic' textAlign='center'> {repo.description} </Text>
          <Text> Last update: {repo.updated_at}</Text>
          {repo.language &&           <Badge width='min-content' p='5px'> {repo.language} </Badge>
}
          <Button width='min-content' bgColor={"cyclamen"}
            onClick={() => {
              navigator.clipboard.writeText(repo.ssh_url);
            }}
          >
            Clone
          </Button>
          </Flex>
        </Card>
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}

export default ReposList;
