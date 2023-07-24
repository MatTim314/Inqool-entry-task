import React from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";

function UserForm() {
  return (
    <FormControl isRequired>
      <FormLabel>Username</FormLabel>
      <Input type="text" placeholder="Enter a username"></Input>

      <Checkbox size="lg" spacing="1rem" defaultChecked>
        List projects
      </Checkbox>
      <Checkbox size="lg" spacing="1rem" defaultChecked>
        List organizations
      </Checkbox>

      <Button type="submit">Search</Button>
    </FormControl>
  );
}

export default UserForm;
