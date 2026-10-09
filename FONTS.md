# Google Sans Font Setup

## 📋 Overview

This TodoApp uses **Google Sans** as the primary font throughout the entire application. Google Sans is a modern, clean typeface designed by Google that works beautifully across all platforms.

---

## 🎨 Font Files

All Google Sans fonts are stored in: `assets/fonts/`

### Available Variants
- GoogleSans-Regular.ttf (400)
- GoogleSans-Medium.ttf (500)
- GoogleSans-SemiBold.ttf (600)
- GoogleSans-Bold.ttf (700)
- GoogleSans-Italic.ttf (400 italic)
- GoogleSans-MediumItalic.ttf (500 italic)
- GoogleSans-SemiBoldItalic.ttf (600 italic)
- GoogleSans-BoldItalic.ttf (700 italic)

---

## 🔧 Font Setup Configuration

### 1. Font Loading (App.tsx)
```typescript
import { useFonts } from './src/hooks/useFonts';

// Load fonts on app startup
const { fontsLoaded } = useFonts();

// Wait for fonts before rendering
if (!fontsLoaded) return <LoadingScreen />;
```

### 2. Font Definitions (src/styles/fonts.ts)
```typescript
export const fontFamily = {
  regular: 'GoogleSans-Regular',
  medium: 'GoogleSans-Medium',
  semibold: 'GoogleSans-SemiBold',
  bold: 'GoogleSans-Bold',
  // ... and italic variants
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
};
```

### 3. Expo Configuration (app.json)
```json
{
  "expo": {
    "plugins": [
      ["expo-font", {
        "fonts": [
          "./assets/fonts/GoogleSans-Regular.ttf",
          "./assets/fonts/GoogleSans-Medium.ttf",
          "./assets/fonts/GoogleSans-SemiBold.ttf",
          "./assets/fonts/GoogleSans-Bold.ttf",
          ...
        ]
      }]
    ]
  }
}
```

---

## 📐 Typography System

### Font Weights & Usage
| Weight | Font Family | Use Case |
|--------|-------------|----------|
| 400 | Regular | Body text, paragraphs |
| 500 | Medium | Subtitles, descriptions |
| 600 | SemiBold | Labels, buttons, secondary headers |
| 700 | Bold | Main headers, titles |

### Font Sizes & Scale
| Size | Value | Use Case |
|------|-------|----------|
| xs | 12px | Small labels, captions |
| sm | 14px | Secondary text |
| base | 16px | Main body text |
| lg | 18px | Stat values |
| xl | 20px | Subtitles |
| 2xl | 24px | Section headers |
| 3xl | 28px | Page titles |
| 4xl | 32px | Large headers |

---

## 💻 Usage in Components

### Example: Using Fonts in Styles
```typescript
import { fontFamily, fontSize } from '../styles/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.bold,
    color: '#000',
  },
  body: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    color: '#666',
  },
  button: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
```

### Applied Components
- **TodoListScreen** - Title uses bold (3xl)
- **TodoItem** - Title uses medium (base)
- **TodoInput** - Input uses regular (base)
- **TodoFilter** - Stats use bold (lg)
- **TodoStats** - Values use bold (lg), labels use regular (xs)
- **TodoSearch** - Input uses regular (base)
- **TodoActions** - Button text uses semibold (base)

---

## 🚀 First Run Setup

When you first run the app:

1. **App starts** - `useFonts()` hook loads all Google Sans fonts
2. **Loading state** - App shows blank screen while fonts load
3. **Fonts ready** - Once loaded, `fontsLoaded` becomes true
4. **Render UI** - App renders with Google Sans applied to all text

### Timeline
- **Time to load fonts**: ~500ms - 2s (depending on device)
- **File size impact**: ~10MB (fonts in assets)
- **Performance**: Minimal impact after initial load

---

## 🔄 Updating Fonts

If you want to add or change fonts:

1. **Add new font file** to `assets/fonts/`
2. **Update fonts.ts**:
   ```typescript
   export const fontFamily = {
     // ... existing
     newFont: 'NewFontName',
   };
   ```
3. **Update useFonts.ts**:
   ```typescript
   await Font.loadAsync({
     // ... existing
     'NewFontName': require('../../assets/fonts/NewFont.ttf'),
   });
   ```
4. **Update app.json** plugins array with new font path
5. **Rebuild** the app

---

## ⚙️ Font Fallbacks

If fonts fail to load:
- System default font displays as fallback
- No crash occurs
- App continues to function normally
- Check `fontLoadError` in `useFonts` hook

```typescript
const { fontsLoaded, fontLoadError } = useFonts();

if (fontLoadError) {
  console.error('Font loading error:', fontLoadError);
  // App will use system font as fallback
}
```

---

## 📚 Resources

- **Google Fonts**: https://fonts.google.com/specimen/Google+Sans
- **License**: OFL License (Open Font License)
- **Weights Available**: 400, 500, 600, 700
- **Styles Available**: Regular, Italic

---

## ✅ Checklist for Font Integration

- [x] Extract Google Sans fonts
- [x] Create fonts.ts with family and size definitions
- [x] Create useFonts hook for loading
- [x] Configure app.json with expo-font plugin
- [x] Update App.tsx to load fonts on startup
- [x] Add expo-font to package.json
- [x] Apply fonts to all components
- [x] Test on web, iOS, and Android

---

**Last Updated**: 2026-10-09
**Font Version**: Google Sans (Variable Font)
**License**: Open Font License (OFL)
