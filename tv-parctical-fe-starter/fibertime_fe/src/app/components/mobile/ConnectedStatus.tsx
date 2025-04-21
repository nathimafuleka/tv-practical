'use client';

import { useEffect, useState } from 'react';
import { ConnectionStatus } from '../../types';
import {
  Box,
  VStack,
  Text,
  Link,
  Icon,
  Container,
  Heading,
  useColorModeValue,
  HStack,
  Badge,
  Divider,
  Button,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { deviceApi } from '../../services/api';
import { RootState } from '../../store';
import { FiWifi, FiClock, FiPackage } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function ConnectedStatus() {
  const { currentDevice } = useSelector((state: RootState) => state.device);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconBgColor = useColorModeValue('green.50', 'green.900');

  useEffect(() => {
    const fetchStatus = async () => {
      if (!currentDevice?.id) {
        setError('No device connected');
        return;
      }

      try {
        const status = await deviceApi.getConnectionStatus(currentDevice.id);
        setConnectionStatus(status);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch connection status:', error);
        setError('Failed to get connection status');
        setConnectionStatus(null);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [currentDevice?.id]);

  if (error) {
    return (
      <Container maxW="container.sm" py={8}>
        <VStack spacing={4} align="center">
          <Icon as={FiWifi} w={12} h={12} color="red.500" />
          <Heading size="lg" textAlign="center">
            Connection Error
          </Heading>
          <Text color="gray.600">{error}</Text>
        </VStack>
      </Container>
    );
  }

  if (!connectionStatus) {
    return (
      <Container maxW="container.sm" py={8}>
        <VStack spacing={4} align="center">
          <Icon as={FiWifi} w={12} h={12} color="blue.500" />
          <Heading size="lg" textAlign="center">
            Connecting...
          </Heading>
          <Text color="gray.600">Please wait while we establish the connection</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} align="center">
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            p={3}
            borderRadius="full"
            bg={iconBgColor}
          >
            <Icon as={CheckCircleIcon} w={12} h={12} color="green.500" />
          </MotionBox>
          <Heading size="lg" textAlign="center">
            TV Connected Successfully
          </Heading>
          <Badge colorScheme="green" fontSize="md" px={3} py={1}>
            Active Connection
          </Badge>
        </VStack>

        {connectionStatus.bundle && (
          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            shadow="sm"
          >
            <VStack spacing={6} align="stretch">
              <HStack spacing={4}>
                <Icon as={FiPackage} w={6} h={6} color="blue.500" />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">{connectionStatus.bundle.name}</Text>
                  <Text color="gray.600" fontSize="sm">
                    Your current package
                  </Text>
                </VStack>
              </HStack>

              <Divider />

              <HStack spacing={4}>
                <Icon as={FiWifi} w={6} h={6} color="blue.500" />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">{connectionStatus.bundle.speed}</Text>
                  <Text color="gray.600" fontSize="sm">
                    Download/Upload speed
                  </Text>
                </VStack>
              </HStack>

              <Divider />

              <HStack spacing={4}>
                <Icon as={FiClock} w={6} h={6} color="blue.500" />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">
                    {connectionStatus.bundle.daysRemaining} days{' '}
                    {connectionStatus.bundle.hoursRemaining} hours remaining
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Time until next renewal
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        )}

        <VStack spacing={4}>
          <Button
            as={Link}
            href="https://wa.me/0719135430"
            variant="outline"
            colorScheme="blue"
            width="full"
            leftIcon={<Icon as={FiWifi} />}
            _hover={{ bg: 'blue.50' }}
          >
            Purchase more bundles via WhatsApp
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
