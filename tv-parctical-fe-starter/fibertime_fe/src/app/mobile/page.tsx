'use client';

import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Login from '../components/mobile/Login';
import PairingCode from '../components/mobile/PairingCode';
import ConnectingStatus from '../components/mobile/ConnectingStatus';
import ConnectedStatus from '../components/mobile/ConnectedStatus';

enum Step {
  LOGIN,
  PAIRING,
  CONNECTING,
  CONNECTED,
}

export default function MobilePage() {
  const [currentStep, setCurrentStep] = useState(Step.LOGIN);

  const renderStep = () => {
    switch (currentStep) {
      case Step.LOGIN:
        return <Login onSuccess={() => setCurrentStep(Step.PAIRING)} />;
      case Step.PAIRING:
        return <PairingCode onSuccess={() => setCurrentStep(Step.CONNECTING)} />;
      case Step.CONNECTING:
        return <ConnectingStatus onSuccess={() => setCurrentStep(Step.CONNECTED)} />;
      case Step.CONNECTED:
        return <ConnectedStatus />;
      default:
        return null;
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
      >
        {renderStep()}
      </Box>
    </Box>
  );
}
