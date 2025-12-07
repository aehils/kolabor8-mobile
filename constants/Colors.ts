/**
 * LMS Mobile App - Design System
 *
 * Aesthetic Direction: "Academic Heritage"
 * A sophisticated palette inspired by the school's identity, combining
 * forest greens with warm gold accents for a timeless, scholarly feel.
 */

// Core palette
export const palette = {
  // Primary - Forest Green & Gold
  primary: {
    50: '#F0F4F2',
    100: '#E1EAE5',
    200: '#C3D5CB',
    300: '#C3A95E',  // Gold accent
    400: '#9FA76A',
    500: '#878D52',  // Sage green
    600: '#5C7447',
    700: '#09563C',  // Forest green
    800: '#074132',
    900: '#052D23',
  },

  // Neutral - Cool grays
  neutral: {
    0: '#FFFFFF',
    50: '#F8F9F8',
    100: '#F1F2F1',
    150: '#E8EAE8',
    200: '#DFE1DF',
    300: '#CED0CE',
    400: '#A3A6A3',
    500: '#757875',
    600: '#595B59',
    700: '#3B3D3B',
    800: '#272827',
    900: '#1A1A1A',
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
    background: palette.neutral[50],
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
