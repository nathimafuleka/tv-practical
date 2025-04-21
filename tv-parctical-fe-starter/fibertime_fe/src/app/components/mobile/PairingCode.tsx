'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  Button,
  Text,
  HStack,
  Container,
  Heading,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useDispatch } from 'react-redux';
import { deviceApi } from '../../services/api';
import { setDevice, setConnectionStatus } from '../../store/slices/deviceSlice';
import { FiMonitor } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface PairingCodeProps {
  onSuccess: () => void;
}

const MotionBox = motion(Box);

export default function PairingCode({ onSuccess }: PairingCodeProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // When user hits connect
  const handleConnect = async () => {
    // Make sure they typed the whole code
    if (!code || code.length !== 4) {
      toast({
        title: 'Oops!',
        description: 'Enter all 4 characters from your TV screen',
        status: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Find the TV
      const tv = await deviceApi.getDevice(code);
      if (!tv?.id) throw new Error('TV not found');

      // Step 2: Connect to it
      await deviceApi.connectDevice(tv.id);
      
      // Step 3: Make sure we're connected
      const status = await deviceApi.getConnectionStatus(tv.id);
      
      // Save everything to Redux
      dispatch(setConnectionStatus(status));
      dispatch(setDevice({
        ...tv,
        status: status.status
      }));

      // Yay!
      toast({
        title: 'Connected!',
        description: 'Your TV is ready to go',
        status: 'success',
        duration: 2000,
      });

      onSuccess();
    } catch (err) {
      // Something went wrong
      let message = 'Wrong code? Try again!';
      
      if (err instanceof Error) {
        message = err.message;
      }
      
      toast({
        title: 'Not working',
        description: message,
        status: 'error',
        duration: 3000,
      });
      
      // Start fresh
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxW="container.sm" py={{ base: 4, sm: 6, md: 8 }} px={{ base: 4, sm: 6 }}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} align="center">
          <MotionBox
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon as={FiMonitor} w={12} h={12} color="blue.500" />
          </MotionBox>
          <Heading size={{ base: 'md', sm: 'lg' }} textAlign="center">
            Connect Your TV
          </Heading>
          <Text color="gray.600" textAlign="center" fontSize={{ base: 'sm', sm: 'md' }}>
            Enter the 4-character code displayed on your TV screen
          </Text>
        </VStack>

        <Box
          p={{ base: 4, sm: 6, md: 8 }}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
        >
          <VStack spacing={6}>
            <HStack spacing={3} justify="center">
              <PinInput
                value={code}
                onChange={setCode}
                type="alphanumeric"
                size={{ base: 'md', sm: 'lg' }}
                placeholder=""
                autoFocus
              >
                <PinInputField
                  textTransform="uppercase"
                  fontSize={{ base: 'xl', sm: '2xl' }}
                  borderColor={borderColor}
                  width={{ base: '40px', sm: '48px' }}
                  height={{ base: '40px', sm: '48px' }}
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                />
                <PinInputField
                  textTransform="uppercase"
                  fontSize={{ base: 'xl', sm: '2xl' }}
                  borderColor={borderColor}
                  width={{ base: '40px', sm: '48px' }}
                  height={{ base: '40px', sm: '48px' }}
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                />
                <PinInputField
                  textTransform="uppercase"
                  fontSize={{ base: 'xl', sm: '2xl' }}
                  borderColor={borderColor}
                  width={{ base: '40px', sm: '48px' }}
                  height={{ base: '40px', sm: '48px' }}
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                />
                <PinInputField
                  textTransform="uppercase"
                  fontSize={{ base: 'xl', sm: '2xl' }}
                  borderColor={borderColor}
                  width={{ base: '40px', sm: '48px' }}
                  height={{ base: '40px', sm: '48px' }}
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                />
              </PinInput>
            </HStack>
            <Button
              colorScheme="blue"
              width="full"
              size={{ base: 'md', sm: 'lg' }}
              onClick={handleConnect}
              isLoading={isLoading}
              loadingText="Connecting..."
              _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              Connect TV
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
