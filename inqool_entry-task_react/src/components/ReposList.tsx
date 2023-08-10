import { CopyIcon } from "@chakra-ui/icons";
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
  Flex,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

interface MyComponentProps {
  repos: Repository[];
}

function ReposList({ repos }: MyComponentProps) {
  const listItems = repos.map((repo) => {
    return (
      <ListItem key={repo.name} p="1rem">
        <Card
          position="relative"
          p="1rem"
          _hover={{
            outline: "1px var(--cyclamen) solid",
          }}
        >
          <Flex direction="column" justify="center" align="center" gap="0.5rem">
            <Heading size="md">
              <Link href={repo.url}>{repo.name}</Link>
            </Heading>
            <Text fontStyle="italic" textAlign="center">
              {" "}
              {repo.description}{" "}
            </Text>
            <Text> Last update: {repo.updated_at}</Text>
            {repo.language && (
              <Badge width="min-content" p="5px">
                {" "}
                {repo.language}{" "}
              </Badge>
            )}
            <Tooltip label="Copy SSH cloning link">
              <IconButton
                aria-label="Copy ssh clone link"
                icon={<CopyIcon />}
                position="absolute"
                bottom="1rem"
                right="1rem"
                width="min-content"
                _hover={{ bgColor: "cyclamen", color: "seasalt" }}
                onClick={() => {
                  navigator.clipboard.writeText(repo.ssh_url);
                }}
              />
            </Tooltip>
          </Flex>
        </Card>
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}

export default ReposList;
