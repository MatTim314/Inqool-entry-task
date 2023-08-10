import { Center, Alert, AlertIcon, AlertTitle, AlertDescription, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';

interface ErrorNotificationProps{
  error: string
}

function ErrorNotification( {error} : ErrorNotificationProps) {
    return <Center>
      <SlideFade in={true}>
        <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius='lg'
        mt='1rem'
        >
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        </Alert>
      </SlideFade>
  </Center>;
}

export default ErrorNotification