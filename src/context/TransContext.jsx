import React, { createContext, useReducer, useEffect } from "react";
import { changeLanguage } from "../i18n";

// Create the context
export const TransContext = createContext();

// Enhanced initial language detection
const getInitialLanguage = () => {
  // First try to get from localStorage
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    const supportedLanguages = ['en', 'fr', 'ar', 'es'];
    if (supportedLanguages.includes(savedLanguage)) {
      console.log('Language loaded from localStorage:', savedLanguage);
      return savedLanguage;
    }
  }
  
  // If not in localStorage or invalid, try to detect from browser
  if (typeof navigator !== 'undefined') {
    // Get browser language
    const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
    const supportedLanguages = ['en', 'fr', 'ar', 'es'];
    
    // Check if browser language is supported
    if (supportedLanguages.includes(browserLang)) {
      console.log('Language detected from browser:', browserLang);
      return browserLang;
    }
    
    // Check for language variants (e.g., en-US, fr-FR)
    const fullLang = navigator.language?.toLowerCase();
    if (fullLang?.startsWith('en')) {
      console.log('English variant detected from browser');
      return 'en';
    }
    if (fullLang?.startsWith('fr')) {
      console.log('French variant detected from browser');
      return 'fr';
    }
    if (fullLang?.startsWith('ar')) {
      console.log('Arabic variant detected from browser');
      return 'ar';
    }
    if (fullLang?.startsWith('es')) {
      console.log('Spanish variant detected from browser');
      return 'es';
    }
  }
  
  // Default fallback
  console.log('Using default language: en');
  return 'en';
};

const INITIAL_STATE = {
  language: typeof window !== 'undefined' ? getInitialLanguage() : 'en',
};

// Reducer function to handle language changes
const TransReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem("language", action.payload);
        console.log('Language changed and saved to localStorage:', action.payload);
      }
      return {
        ...state,
        language: action.payload,
      };
    case "INIT_LANGUAGE":
      // Initialize language from localStorage or browser
      const initialLang = getInitialLanguage();
      if (typeof window !== 'undefined') {
        localStorage.setItem("language", initialLang);
      }
      return {
        ...state,
        language: initialLang,
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
    
    // Set HTML lang attribute
    document.documentElement.lang = state.language;
    
  }, [state.language]);

  // Initialize language on first load
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem("language")) {
      dispatch({ type: "INIT_LANGUAGE" });
    }
  }, []);

  return (
    <TransContext.Provider value={{ state, dispatch }}>
      {children}
    </TransContext.Provider>
  );
};