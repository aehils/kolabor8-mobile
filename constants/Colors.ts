/**
 * LMS Mobile App - Design System
 *
 * Aesthetic Direction: "Academic Heritage"
 * A sophisticated palette inspired by the school's identity, combining
 * forest greens with warm gold accents for a timeless, scholarly feel.
 */

// Core palette
export const palette = {
  // Forest - Dark green for backgrounds (#09563C)
  forest: {
    50: '#EEF3F1',
    100: '#D4E4DD',
    200: '#AACABF',
    300: '#6D9D8A',
    400: '#3E7661',
    500: '#09563C',  // Base forest green
    600: '#074836',
    700: '#053A2D',
    800: '#042D23',
    900: '#02201A',
  },

  // Sage - Medium green for foreground/interactive (#878D52)
  sage: {
    50: '#F4F5EF',
    100: '#E7E9DC',
    200: '#D0D3BA',
    300: '#B8BD97',
    400: '#9FA575',
    500: '#878D52',  // Base sage green
    600: '#6C7142',
    700: '#525632',
    800: '#3A3D24',
    900: '#252718',
  },

  // Gold - Sand/gold for accents (#C3A95E)
  gold: {
    50: '#FAF7F0',
    100: '#F4EDDC',
    200: '#E9DABA',
    300: '#DEC897',
    400: '#D3B675',
    500: '#C3A95E',  // Base gold
    600: '#9C874B',
    700: '#756538',
    800: '#544829',
    900: '#38301C',
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
    text: palette.forest[900],
    textSecondary: palette.forest[600],
    background: palette.forest[50],      // Light forest green background
    surface: palette.neutral[0],         // White surfaces
    surfaceSecondary: palette.forest[100], // Slightly darker forest tint
    tint: palette.sage[500],             // Sage green for interactive elements
    tabIconDefault: palette.forest[400],
    tabIconSelected: palette.sage[500],  // Sage for selected tabs
    border: palette.forest[200],
    accent: palette.gold[500],           // Gold accents

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
    textSecondary: palette.forest[200],
    background: palette.forest[900],     // Dark forest green background
    surface: palette.forest[800],        // Slightly lighter forest surface
    surfaceSecondary: palette.forest[700],
    tint: palette.sage[400],             // Lighter sage for dark mode
    tabIconDefault: palette.forest[400],
    tabIconSelected: palette.gold[400],  // Gold for selected tabs in dark mode
    border: palette.forest[700],
    accent: palette.gold[400],           // Gold accents

    // Semantic
    success: palette.success.main,
    successLight: palette.forest[800],
    warning: palette.warning.main,
    warningLight: palette.forest[800],
    error: palette.error.main,
    errorLight: palette.forest[800],
    info: palette.info.main,
    infoLight: palette.forest[800],
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
    shadowColor: '#02201A',  // Dark forest green
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#02201A',  // Dark forest green
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#02201A',  // Dark forest green
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
};

export default Colors;
