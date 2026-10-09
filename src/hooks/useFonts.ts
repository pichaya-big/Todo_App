import { useEffect, useState } from 'react';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Fonts are loaded via expo-font plugin in app.json
    // Just mark as ready after a brief delay to ensure renderer is ready
    const timer = setTimeout(() => {
      setFontsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { fontsLoaded };
};
