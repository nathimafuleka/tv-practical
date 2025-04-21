'use client';

import { useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Container,
  Heading,
  useColorModeValue,
  Badge,
  Link,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiMonitor } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { setDevice, setConnectionStatus, setPairingCode } from '../store/slices/deviceSlice';
import { RootState } from '../store';
import { motion } from 'framer-motion';
import { deviceApi } from '../services/api';

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const MotionBox = motion(Box);

export default function TVScreen() {
  const dispatch = useDispatch();
  // Get what we need from Redux
  const { pairingCode, currentDevice, connectionStatus } = useSelector((state: RootState) => state.device);
  
  // Simple check - if both device and status say we're connected, we're good
  const isConnected = currentDevice?.status === 'connected' && connectionStatus?.status === 'connected';
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.600, purple.600)',
    'linear(to-br, blue.800, purple.800)'
  );

  // This checks if someone connected with the code
  const checkDeviceStatus = useCallback(async () => {
    try {
      // No code? Make one
      if (!pairingCode) {
        const newCode = await deviceApi.createDeviceCode('tv_1');
        dispatch(setPairingCode(newCode.code));
        return;
      }

      // See if anyone used our code
      const device = await deviceApi.getDevice(pairingCode);

      // Check if they're still connected
      const status = await deviceApi.getConnectionStatus(device.id);

      // TODO: Maybe add offline detection?
      dispatch(setDevice(device));
      dispatch(setConnectionStatus(status));

      // For debugging
      if (status.status === 'connected') {
        console.log('🎉 Someone connected!');
      }
    } catch (error) {
      console.error('Failed to check device status:', error);
    }
  }, [dispatch, pairingCode]);

  useEffect(() => {
    // Check immediately
    checkDeviceStatus();
    
    // Start polling
    const intervalId = setInterval(checkDeviceStatus, 5000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [pairingCode, dispatch, checkDeviceStatus]);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient={bgGradient}
      color="white"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)"
        pointerEvents="none"
      />

      <Container maxW="container.md" centerContent px={{ base: 4, sm: 6, md: 8 }}>
        <VStack spacing={8} textAlign="center">
          <MotionBox
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon as={FiMonitor} w={16} h={16} />
          </MotionBox>

          <VStack spacing={4}>
            <Heading size={{ base: 'md', sm: 'lg' }} fontWeight="bold">
              Connect Your TV
            </Heading>
            <Text fontSize={{ base: 'md', sm: 'lg' }} opacity={0.9}>
              Enter this code on your phone to connect:
            </Text>
          </VStack>

          <Box
            bg="rgba(255,255,255,0.1)"
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            p={8}
            animation={`${pulseAnimation} 2s infinite`}
          >
            <Text
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              fontWeight="bold"
              letterSpacing={{ base: '0.3em', sm: '0.4em', md: '0.5em' }}
              textAlign="center"
              fontFamily="mono"
            >
              {pairingCode}
            </Text>
          </Box>

          {/* Show connection status with a nice badge */}
          <Badge
            colorScheme={isConnected ? 'green' : 'yellow'}
            fontSize="md"
            px={4}
            py={2}
            borderRadius="full"
            bg={isConnected ? 'rgba(72, 187, 120, 0.2)' : 'rgba(236, 201, 75, 0.2)'}
          >
            {isConnected ? '✨ Connected!' : '⌛ Enter code on your phone...'}
          </Badge>

          <Text fontSize="sm" opacity={0.8}>
            Need help?{' '}
            <Link
              href="https://wa.me/0719135430"
              color="blue.400"
              _hover={{ color: 'blue.300' }}
            >
              Contact support
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
