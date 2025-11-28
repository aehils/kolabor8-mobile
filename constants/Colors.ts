/**
 * LMS Mobile App - Design System
 * 
 * Aesthetic Direction: "Academic Warmth"
 * A refined, warm palette with subtle depth that feels both professional 
 * and welcoming. Inspired by quality stationery and modern educational spaces.
 */

// Core palette
export const palette = {
  // Primary - Warm terracotta
  primary: {
    50: '#FEF7F4',
    100: '#FCEEE8',
    200: '#F9DDD1',
    300: '#F4C4AD',
    400: '#E89B74',
    500: '#D97B4A',
    600: '#C4612F',
    700: '#A34D24',
    800: '#7D3B1C',
    900: '#5C2C15',
  },
  
  // Neutral - Warm grays
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAF9',
    100: '#F5F4F2',
    150: '#EDEBE8',
    200: '#E4E2DE',
    300: '#D4D1CB',
    400: '#A8A49C',
    500: '#7A756C',
    600: '#5C5850',
    700: '#3D3A35',
    800: '#292723',
    900: '#1A1917',
  },
  
  // Semantic
  success: {
    light: '#E8F5E9',
    main: '#4CAF50',
    dark: '#2E7D32',
  },
  warning: {
    light: '#FFF8E1',
    main: '#FFA726',
    dark: '#EF6C00',
  },
  error: {
    light: '#FFEBEE',
    main: '#EF5350',
    dark: '#C62828',
  },
  info: {
    light: '#E3F2FD',
    main: '#42A5F5',
    dark: '#1565C0',
  },
};

// Theme colors
const Colors = {
  light: {
    text: palette.neutral[900],
    textSecondary: palette.neutral[500],
    background: palette.neutral[150],
    surface: palette.neutral[0],
    surfaceSecondary: palette.neutral[100],
    tint: palette.primary[500],
    tabIconDefault: palette.neutral[400],
    tabIconSelected: palette.primary[500],
    border: palette.neutral[200],
    
    // Semantic
    success: palette.success.main,
    successLight: palette.success.light,
    warning: palette.warning.main,
    warningLight: palette.warning.light,
    error: palette.error.main,
    errorLight: palette.error.light,
    info: palette.info.main,
    infoLight: palette.info.light,
  },
  dark: {
    text: palette.neutral[50],
    textSecondary: palette.neutral[400],
    background: palette.neutral[900],
    surface: palette.neutral[800],
    surfaceSecondary: palette.neutral[700],
    tint: palette.primary[400],
    tabIconDefault: palette.neutral[500],
    tabIconSelected: palette.primary[400],
    border: palette.neutral[700],
    
    // Semantic
    success: palette.success.main,
    successLight: palette.neutral[800],
    warning: palette.warning.main,
    warningLight: palette.neutral[800],
    error: palette.error.main,
    errorLight: palette.neutral[800],
    info: palette.info.main,
    infoLight: palette.neutral[800],
  },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

// Border radius
export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  full: 9999,
};

// Typography
export const typography = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#1A1917',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#1A1917',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#1A1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
};

export default Colors;
