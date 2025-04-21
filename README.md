# TV Pairing App

A modern TV pairing application built with Next.js 13+ and Chakra UI. This app demonstrates a real-world TV-mobile device pairing flow with live status updates.

## 🌟 Features

- **TV Screen**: Displays pairing code and real-time connection status
- **Mobile Flow**: Step-by-step pairing process
  - Login screen with OTP authentication
  - Dedicated OTP viewing page for development
  - Code entry with validation
  - Connection status
  - Bundle information display
- **Real-time Updates**: Live connection status with polling
- **Developer Tools**: 
  - OTP viewing page for easy testing
  - Backend console logging
  - Real-time OTP status updates
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean interface with smooth animations

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nathimafuleka/tv-practical.git
```

2. Start the backend:
```bash
cd tv-parctical-be-starter/fibertime_be
npm install
npm run start:dev
```

3. Start the frontend:
```bash
cd tv-parctical-fe-starter/fibertime_fe
npm install
npm run dev
```

4. Access the application:
- Open http://localhost:3000 for the main application
- Visit http://localhost:3000/otp-view to see current OTP (development only)

## 💻 Development Features

### OTP Viewing
- Click "View Current OTP" on the login page
- See both phone number and OTP in a dedicated view
- Auto-refreshes every 2 seconds
- Manual refresh button available
- OTP is also logged in the backend console

A modern TV pairing application built with Next.js 13+ and Chakra UI. This app demonstrates a real-world TV-mobile device pairing flow with live status updates.

## 🌟 Features

- **TV Screen**: Displays pairing code and real-time connection status
- **Mobile Flow**: Step-by-step pairing process
  - Login screen
  - Code entry with validation
  - Connection status
  - Bundle information display
- **Real-time Updates**: Live connection status with polling
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean interface with smooth animations

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nathimafuleka/tv-practical.git
cd tv-practical/tv-parctical-fe-starter/fibertime_fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser:
- TV Screen: [http://localhost:3000/tv](http://localhost:3000/tv)
- Mobile App: [http://localhost:3000/mobile](http://localhost:3000/mobile)

## 🎮 How to Use

1. **TV Screen Setup**:
   - Open the TV URL in your browser
   - You'll see a 4-character pairing code
   - The code refreshes automatically if not used

2. **Mobile Pairing**:
   - Open the Mobile URL in another browser window
   - Enter your name to continue
   - Type in the code shown on the TV
   - Click 'Connect'

3. **Connection Status**:
   - TV screen shows 'Connected' when paired
   - Mobile screen shows bundle information
   - Connection times out after 30 seconds of inactivity

## 🔌 API Integration

The app integrates with a NestJS backend that provides:

### Endpoints

- `POST /api/device/create-device-code`: Generate new device code
  ```typescript
  Response: { code: string, device_id: string }
  ```

- `GET /api/device/device`: Get device info by code
  ```typescript
  Response: { id: string, code: string, status: 'pending' | 'connected' }
  ```

- `POST /api/device/connect-device`: Connect a device
  ```typescript
  Response: { id: string, code: string, status: 'connected' }
  ```

- `GET /api/device/connection-status`: Check connection status
  ```typescript
  Response: {
    status: 'pending' | 'connected',
    bundle?: {
      name: string,
      speed: string,
      daysRemaining: number,
      hoursRemaining: number
    }
  }
  ```

## 🎨 UI/UX Enhancements

- Smooth transitions between steps using Framer Motion
- Loading states with skeleton loaders
- Toast notifications for user feedback
- Pulsing animation for the pairing code
- Responsive design with mobile-first approach
- Emoji-based status indicators
- User-friendly error messages
- Clean, modern interface
- Dark/Light mode support

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 13+ with App Router
  - React 18 with Hooks
  - TypeScript for type safety

- **State Management**:
  - Redux Toolkit for global state
  - React Context for theme

- **UI/UX**:
  - Chakra UI components
  - Framer Motion animations
  - Responsive design

- **API Integration**:
  - Axios for HTTP requests
  - Custom API hooks
  - Error boundary handling

- **Backend**:
  - NestJS with TypeScript
  - In-memory device storage
  - Real-time status updates

## 🧪 Error Handling

The app includes comprehensive error handling:

1. **User Input**:
   - Invalid pairing codes
   - Incomplete code entry
   - Form validation

2. **Network**:
   - API failures
   - Connection timeouts
   - Retry mechanisms

3. **Device States**:
   - Device not found
   - Already connected
   - Connection lost
   - Session expired

4. **User Feedback**:
   - Toast notifications
   - Error messages
   - Loading states
   - Recovery options

## 📱 Live Demo

Visit the live demo: https://tv-practical-lgql.vercel.app/mobile and https://tv-practical-lgql.vercel.app/tv
## 🎥 Demo Video

Watch the walkthrough: https://youtu.be/jMbmc0oS1cw

## 📝 License

MIT License - feel free to use this code for your own projects!
