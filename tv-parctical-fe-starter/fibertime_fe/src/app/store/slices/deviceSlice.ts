import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device, ConnectionStatus } from '../../types';

export interface DeviceState {
  currentDevice: Device | null;
  connectionStatus: ConnectionStatus | null;
  pairingCode: string | null;
}

const initialState: DeviceState = {
  currentDevice: null,
  connectionStatus: null,
  pairingCode: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<Device>) => {
      state.currentDevice = action.payload;
    },
    setPairingCode: (state, action: PayloadAction<string>) => {
      state.pairingCode = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connectionStatus = action.payload;
      
      // Also update the device status if we have a device
      if (state.currentDevice) {
        state.currentDevice.status = action.payload.status;
      }
    },
    resetDevice: (state) => {
      state.currentDevice = null;
      state.connectionStatus = null;
      state.pairingCode = null;
    },
  },
});

export const { setDevice, setPairingCode, setConnectionStatus, resetDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
