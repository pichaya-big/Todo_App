// Clarity Flow Design System Colors
// iOS-native modern minimalist design

export const lightColors = {
  // Surface Hierarchy
  background: '#faf8ff',
  surface: '#ffffff',
  surfaceDim: '#f2f3ff',
  surfaceContainer: '#eaedff',
  surfaceContainerHigh: '#e2e7ff',

  // Text Colors
  text: '#0f172a', // Slate 900 - Primary text
  textSecondary: '#334155', // Slate 700 - Secondary text
  textTertiary: '#64748b', // Slate 500 - Tertiary/Placeholder

  // Accents
  primary: '#4f46e5', // Electric Indigo
  primaryContainer: '#4f46e5',
  secondary: '#0058be', // Royal Blue
  tertiary: '#950029', // Rose

  // Semantic Colors
  success: '#16a34a', // Emerald - Low Priority
  warning: '#d97706', // Amber - Medium Priority
  error: '#e11d48', // Rose - High Priority, Errors

  // Borders & Strokes
  border: '#e2e8f0', // Slate 200
  borderVariant: '#cbd5e1', // Slate 300
  outline: '#94a3b8', // Slate 400

  // Priority Colors
  priorityHigh: {
    background: '#fee2e2',
    border: '#fecdd3',
    text: '#e11d48',
  },
  priorityMedium: {
    background: '#fef3c7',
    border: '#fde68a',
    text: '#d97706',
  },
  priorityLow: {
    background: '#dcfce7',
    border: '#bbf7d0',
    text: '#16a34a',
  },

  // Category Colors (mapped from work/personal etc)
  category: {
    work: '#2170e4', // Blue
    personal: '#4f46e5', // Indigo
    shopping: '#16a34a', // Green
    health: '#e11d48', // Rose
  },

  // States
  disabled: '#cbd5e1',
};

export const darkColors = {
  // Surface Hierarchy
  background: '#0f172a',
  surface: '#1a254f',
  surfaceDim: '#131b2e',
  surfaceContainer: '#1e2d4a',
  surfaceContainerHigh: '#2a3b5a',

  // Text Colors
  text: '#f1f5f9', // Light slate
  textSecondary: '#cbd5e1', // Light slate 700
  textTertiary: '#94a3b8', // Light slate 500

  // Accents
  primary: '#c3c0ff', // Light indigo
  primaryContainer: '#6366f1',
  secondary: '#93c5fd', // Light blue
  tertiary: '#fb7185', // Light rose

  // Semantic Colors
  success: '#86efac', // Light green
  warning: '#fbbf24', // Light amber
  error: '#f87171', // Light red

  // Borders & Strokes
  border: '#334155',
  borderVariant: '#475569',
  outline: '#64748b',

  // Priority Colors
  priorityHigh: {
    background: '#3b1a1a',
    border: '#5a2d2d',
    text: '#fb7185',
  },
  priorityMedium: {
    background: '#3b3a1a',
    border: '#5a5a2d',
    text: '#fbbf24',
  },
  priorityLow: {
    background: '#1a3b1a',
    border: '#2d5a2d',
    text: '#86efac',
  },

  // Category Colors
  category: {
    work: '#60a5fa',
    personal: '#a78bfa',
    shopping: '#34d399',
    health: '#f87171',
  },

  // States
  disabled: '#475569',
};

export const getColors = (isDark: boolean) => isDark ? darkColors : lightColors;
