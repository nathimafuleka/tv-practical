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
import { authApi } from '../../services/api';
import { setCredentials } from '../../store/slices/authSlice';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiArrowRight } from 'react-icons/fi';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import Link from 'next/link';

interface LoginProps {
  onSuccess: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const validateSAPhoneNumber = (phone: string): boolean => {
    // Allow both +27 and 0 formats
    return phone && (phone.startsWith('+27') || phone.startsWith('0'));
  };

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    // Convert 0XX format to +27XX format
    if (phone.startsWith('0')) {
      return '+27' + phone.slice(1);
    }
    return phone;
  };

  const handleRequestOtp = async () => {
    if (!phoneNumber) {
      toast({
        title: 'Error',
        description: 'Please enter your phone number',
        status: 'error',
      });
      return;
    }

    if (!validateSAPhoneNumber(phoneNumber)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid South African phone number',
        status: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log('Requesting OTP for:', formattedPhone);
      console.log('Request payload:', { cell_number: formattedPhone });
      
      await authApi.requestOtp(formattedPhone);
      console.log('OTP request successful');
      setIsOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the verification code',
        status: 'success',
        duration: 5000,
      });
    } catch (error) {
      console.error('OTP request error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send verification code';
      
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter the complete verification code',
        status: 'error',
      });
      return;
    }

    if (!phoneNumber) {
      toast({
        title: 'Error',
        description: 'Phone number is missing',
        status: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log('Logging in with:', formattedPhone, otp);
      const response = await authApi.login(formattedPhone, otp);
      if (response && response.token) {
        dispatch(setCredentials({
          token: response.token,
          phoneNumber: phoneNumber,
        }));
        toast({
          title: 'Success',
          description: 'Successfully verified',
          status: 'success',
        });
        onSuccess();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify code. Please try again.',
        status: 'error',
      });
      setOtp(''); // Clear the OTP input on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="right">
          <Link href="/otp-view" style={{ textDecoration: 'none' }}>
            <Text color="blue.500" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
              View Current OTP
            </Text>
          </Link>
        </Box>
        <VStack spacing={4} align="center">
          <Icon as={MdOutlinePhoneAndroid} w={12} h={12} color="blue.500" />
          <Heading size="lg" textAlign="center">
            {!isOtpSent ? 'Connect Your TV' : 'Verify Your Number'}
          </Heading>
          <Text color="gray.600" textAlign="center">
            {!isOtpSent
              ? 'Enter your phone number to get started'
              : `We've sent a verification code to ${phoneNumber}`}
          </Text>
        </VStack>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
        >
          {!isOtpSent ? (
            <VStack spacing={4}>
              <Box width="full">
                <PhoneInput
                  international
                  defaultCountry="ZA"
                  value={phoneNumber}
                  onChange={setPhoneNumber as (value: string | undefined) => void}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: borderColor,
                  }}
                />
              </Box>
              <Button
                colorScheme="blue"
                width="full"
                size="lg"
                onClick={handleRequestOtp}
                isLoading={isLoading}
                rightIcon={<FiArrowRight />}
              >
                Continue
              </Button>
            </VStack>
          ) : (
            <VStack spacing={6}>
              <HStack spacing={3} justify="center">
                <PinInput
                  value={otp}
                  onChange={setOtp}
                  size="lg"
                  otp
                  mask
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <VStack width="full" spacing={3}>
                <Button
                  colorScheme="blue"
                  width="full"
                  size="lg"
                  onClick={handleLogin}
                  isLoading={isLoading}
                >
                  Verify Code
                </Button>
                <Button
                  variant="ghost"
                  width="full"
                  onClick={handleRequestOtp}
                  isDisabled={isLoading}
                >
                  Resend Code
                </Button>
              </VStack>
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
