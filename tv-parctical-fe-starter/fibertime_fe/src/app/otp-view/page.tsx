'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { authApi } from '../services/api';

interface OtpInfo {
  phone: string;
  otp: string;
}

export default function OtpView() {
  const [otpInfo, setOtpInfo] = useState<OtpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchOtp = async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    try {
      setIsLoading(true);
      const data = await authApi.getCurrentOtp();
      setOtpInfo(data);
    } catch (error) {
      console.error('Failed to fetch OTP:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch OTP',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch OTP on mount and start polling
  useEffect(() => {
    fetchOtp();
    const interval = setInterval(fetchOtp, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Current OTP</Heading>
          <Button
            leftIcon={<RepeatIcon />}
            onClick={fetchOtp}
            isLoading={isLoading}
            colorScheme="blue"
          >
            Refresh
          </Button>
        </Box>

        {otpInfo ? (
          <Box
            p={6}
            bg="blue.50"
            borderRadius="lg"
            textAlign="center"
          >
            <Text color="blue.800" mb={2}>Phone Number</Text>
            <Text fontSize="lg" fontFamily="mono" color="blue.600" mb={4}>
              {otpInfo.phone}
            </Text>
            <Text color="blue.800" mb={2}>Verification Code</Text>
            <Text fontSize="3xl" fontWeight="bold" fontFamily="mono" color="blue.600">
              {otpInfo.otp}
            </Text>
          </Box>
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">
              {isLoading ? 'Loading...' : 'No active OTP found'}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}
