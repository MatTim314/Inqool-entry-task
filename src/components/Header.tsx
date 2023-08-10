import { Center, Heading, Highlight } from "@chakra-ui/react";

function Header() {
  return (
    <Center>
      <Heading size="4xl" pb="2rem">
        <Highlight
          query={["GET"]}
          styles={{
            px: "2",
            py: "2",
            rounded: "5px",
            bg: "var(--picton-blue)",
            color: "white",
          }}
        >
          GitHubGET
        </Highlight>
      </Heading>
    </Center>
  );
}

export default Header;
