import { Center, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useState } from 'react';

interface ErrorNotificationProps{
  error: string
}

function ErrorNotification( {error} : ErrorNotificationProps) {
    return <Center>
    <Alert
      status="error"
      w="35%"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  </Center>;
}

export default ErrorNotification