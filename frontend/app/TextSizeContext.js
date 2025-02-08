import React, { createContext, useState, useContext } from 'react';

const AppSettingsContext = createContext();
const TextSizeContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(16);
  const [colorBlindMode, setColorBlindMode] = useState(null); // Store color blindness type
  

  return (
    <AppSettingsContext.Provider value={{ textSize, setTextSize, colorBlindMode, setColorBlindMode }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => useContext(AppSettingsContext);

//TEXT SIZE
export const TextSizeProvider = ({ children }) => {
    const [textSize, setTextSize] = useState(16); // Default text size
    const [profileImage, setProfileImage] = useState(null); // Store Profile Image Globally
    return (
      <TextSizeContext.Provider value={{ textSize, setTextSize, profileImage, setProfileImage }}>
        {children}
      </TextSizeContext.Provider>
    );
  };
  
  export const useTextSize = () => useContext(TextSizeContext);
