import React, { createContext, useReducer, useEffect } from "react";
import { changeLanguage } from "../i18n";

// Create the context
export const TransContext = createContext();

// Initial state with language preference from localStorage or default to browser language
const getInitialLanguage = () => {
  // First try to get from localStorage
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) return savedLanguage;
  
  // If not in localStorage, try to detect from browser
  const browserLang = navigator.language?.split('-')[0];
  const supportedLanguages = ['en', 'fr', 'ar', 'es'];
  
  return supportedLanguages.includes(browserLang) ? browserLang : 'en';
};

const INITIAL_STATE = {
  language: typeof window !== 'undefined' ? getInitialLanguage() : 'en',
};

// Reducer function to handle language changes
const TransReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      localStorage.setItem("language", action.payload);
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

// Context Provider component
export const TransContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransReducer, INITIAL_STATE);

  // Initialize language on mount and handle RTL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply language change
    changeLanguage(state.language);
    
    // Set document direction based on language
    const isRTL = state.language === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.className = isRTL ? "rtl" : "ltr";
    
    // Add RTL-specific CSS if needed
    if (isRTL) {
      document.body.classList.add("rtl-layout");
    } else {
      document.body.classList.remove("rtl-layout");
    }
  }, [state.language]);

  return (
    <TransContext.Provider value={{ state, dispatch }}>
      {children}
    </TransContext.Provider>
  );
};