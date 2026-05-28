import { createContext, useContext, useState, useLayoutEffect, useEffect } from 'react';

export const MobileScaleContext = createContext(null);

export function MobileScaleProvider({ children }) {
  // Default global scale of 0.5
  const [scale, setScale] = useState(0.5);
  
  return (
    <MobileScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </MobileScaleContext.Provider>
  );
}

export function useMobileScale(newScale) {
  const context = useContext(MobileScaleContext);
  
  if (!context) {
    throw new Error('useMobileScale must be used within a MobileScaleProvider');
  }
  
  const { setScale } = context;
  
  useLayoutEffect(() => {
    if (newScale !== undefined && newScale !== null) {
      setScale(newScale);
    }
  }, [newScale, setScale]);
}

export function useMobileLandscapeDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Because we use initial-scale=0.25, window.innerWidth is massively scaled (e.g. 1600px+).
      // We must use user-agent or screen.width to detect mobile reliably.
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // If it's a known mobile OS or has touch and small physical screen
      setIsMobile(isMobileDevice || (isTouch && window.screen.width <= 1024));

      // Use screen dimensions for portrait detection since innerHeight/innerWidth might be affected by keyboard popups or scale
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return { isMobile, isPortrait };
}
