# Kolabor8 for Mobile (iOS/Android)
## Getting Started

### Prerequisites

- Node.js v18+
- Expo Go app on your phone (for testing)

### Installation

```bash
cd lms-mobile
npm install
```

### Running the App

```bash
npx expo start
```

Then:
- **iOS**: Scan QR code with Camera app
- **Android**: Scan QR code with Expo Go app
- **Web**: Press `w` in terminal

## Tab Navigation

| Tab | Icon | Route |
|-----|------|-------|
| Student | person | /student | 
| Services | grid | /services | 
| Home | home | / (index) |
| Schedule | calendar | /schedule |

## Tech Stack

- **Framework**: React Native + Expo SDK 54
- **Navigation**: expo-router (file-based routing)
- **Language**: TypeScript
- **Styling**: StyleSheet with design tokens
