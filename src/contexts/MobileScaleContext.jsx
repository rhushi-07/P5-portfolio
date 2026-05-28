import { createContext, useContext, useState, useLayoutEffect } from 'react';

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
