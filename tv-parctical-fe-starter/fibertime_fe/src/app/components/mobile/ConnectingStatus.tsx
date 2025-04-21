'use client';

import { useEffect } from 'react';
import { Box, VStack, Text, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deviceApi } from '../../services/api';
import { setConnectionStatus } from '../../store/slices/deviceSlice';
import { RootState } from '../../store';
import { Device } from '../../types';

interface ConnectingStatusProps {
  onSuccess: () => void;
}

export default function ConnectingStatus({ onSuccess }: ConnectingStatusProps) {
  const dispatch = useDispatch();
  const device = useSelector((state: RootState) => state.device.currentDevice as Device | null);

  useEffect(() => {
    const connectDevice = async () => {
      if (!device?.id) return;

      try {
        await deviceApi.connectDevice(device.id);
        const status = await deviceApi.getConnectionStatus(device.id);
        dispatch(setConnectionStatus(status));
        onSuccess();
      } catch (error) {
        console.error('Failed to connect device:', error);
      }
    };

    connectDevice();
  }, [device, dispatch, onSuccess]);

  return (
    <Box p={4}>
      <VStack gap={6}>
        <Spinner size="xl" />
        <Text fontSize="xl" fontWeight="bold">
          Busy connecting your TV...
        </Text>
      </VStack>
    </Box>
  );
}
