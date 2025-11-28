# Campus LMS Mobile App

A React Native mobile application for a Learning Management System, built with Expo and expo-router.

## Current Status

**Phase 1: Services Page** ✅ Complete  
**Navigation: 4-Tab Layout** ✅ Complete

The app features all 4 tabs (Student, Services, Home, Schedule) with the Services page fully implemented.

## Project Structure

```
lms-mobile/
├── app/                        # Expo Router pages
│   ├── (tabs)/                 # Tab navigation group
│   │   ├── _layout.tsx         # Tab bar configuration
│   │   ├── index.tsx           # Home tab (default)
│   │   ├── student.tsx         # Student profile tab
│   │   ├── services.tsx        # Services tab (complete)
│   │   └── schedule.tsx        # Schedule tab
│   ├── _layout.tsx             # Root layout
│   └── +not-found.tsx          # 404 page
├── components/
│   ├── PageHeader.tsx          # Reusable page header
│   ├── PlaceholderScreen.tsx   # Placeholder for upcoming pages
│   └── ServiceTile.tsx         # Service tile component
├── constants/
│   ├── Colors.ts               # Design system & theme
│   └── Services.ts             # Services data & types
└── assets/
    ├── fonts/
    └── images/
```

## Features

### Services Page

| Service | Tile Type | Status Indicator |
|---------|-----------|-----------------|
| Attendance Check-in | Full-width featured | — |
| Campus Map | Double-height | — |
| Library | Standard | Capacity level |
| Events | Standard | Event count badge |
| Sports | Standard | — |
| IT Services | Standard | — |
| Health & Wellness | Standard | Operating hours |

### Design System ("Academic Warmth")

- **Primary Color**: Warm terracotta (#D97B4A)
- **Background**: Warm off-white (#FAF9F7)
- **Typography**: System fonts with refined weights
- **Animations**: Smooth press feedback on tiles
- **Dark Mode**: Fully supported

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

| Tab | Icon | Route | Status |
|-----|------|-------|--------|
| Student | person | /student | Placeholder |
| Services | grid | /services | ✅ Complete |
| Home | home | / (index) | Placeholder |
| Schedule | calendar | /schedule | Placeholder |

## Tech Stack

- **Framework**: React Native + Expo SDK 54
- **Navigation**: expo-router (file-based routing)
- **Language**: TypeScript
- **Styling**: StyleSheet with design tokens

## Next Steps

1. **Build out Home page** — Dashboard with quick actions
2. **Build out Schedule page** — Class timetable view
3. **Build out Student page** — Profile & academic info
4. **Backend integration** — API for real-time data
5. **Authentication** — Student login flow

## License

Proprietary - All rights reserved
