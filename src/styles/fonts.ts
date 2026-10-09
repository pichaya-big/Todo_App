// Clarity Flow Typography System
// Based on Material Design 3 with iOS-native flair

export const fontFamily = {
  regular: 'GoogleSans-Regular',
  medium: 'GoogleSans-Medium',
  semibold: 'GoogleSans-SemiBold',
  bold: 'GoogleSans-Bold',
  italic: 'GoogleSans-Italic',
};

// Typography Scale - Clarity Flow specs adapted
export const typography = {
  // Headlines
  headlineXlMobile: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    lineHeight: 34,
  },
  headlineLg: {
    fontSize: 24,
    fontFamily: fontFamily.semibold,
    lineHeight: 30,
  },
  headlineMd: {
    fontSize: 20,
    fontFamily: fontFamily.semibold,
    lineHeight: 26,
  },
  headlineSm: {
    fontSize: 17,
    fontFamily: fontFamily.semibold,
    lineHeight: 22,
  },

  // Body Text
  bodyLg: {
    fontSize: 17,
    fontFamily: fontFamily.regular,
    lineHeight: 24,
  },
  bodyMd: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    lineHeight: 20,
  },
  bodySm: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    lineHeight: 18,
  },

  // Labels & Small Text
  labelMd: {
    fontSize: 13,
    fontFamily: fontFamily.semibold,
    lineHeight: 16,
  },
  labelSm: {
    fontSize: 11,
    fontFamily: fontFamily.semibold,
    lineHeight: 14,
  },
};

// Quick access fontSize
export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
};

// Spacing System - 8pt baseline
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
};

// Border Radius - iOS squircles
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows - Clarity Flow elevation system
export const shadows = {
  none: 'none',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)',
  md: '0 8px 16px -4px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
  lg: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
};
