import { createContext, useContext, useState } from "react"

const LanguageContext = createContext()

export const translations = {
  en: {
    home: "Home",
    levels: "Levels",
    videos: "Videos",
    downloads: "Downloads",
    profile: "Profile",
    search_placeholder: "Search videos...",
    continue_learning: "Continue Learning",
    xp_points: "XP Points",
    day_streak: "Day Streak",
    achievements: "Achievements",
    settings: "Settings",
    dark_mode: "Dark Mode",
    language: "Language",
    logout: "Log Out",
    welcome: "Welcome back",
    upload_video: "Upload Video",
    market: "Market",
    community: "Community",
  },
  hi: {
    home: "होम",
    levels: "स्तर",
    videos: "वीडियो",
    downloads: "डाउनलोड",
    profile: "प्रोफाइल",
    search_placeholder: "वीडियो खोजें...",
    continue_learning: "सीखना जारी रखें",
    xp_points: "XP अंक",
    day_streak: "दिन की लकीर", // Literal translation, maybe refine "लगातार उपस्थिति"
    achievements: "उपलब्धियां",
    settings: "सेटिंग्स",
    dark_mode: "डार्क मोड",
    language: "भाषा",
    logout: "लॉग आउट",
    welcome: "वापसी पर स्वागत है",
    upload_video: "वीडियो अपलोड करें",
    market: "मंडी के भाव",
    community: "किसान मंच",
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("hi") // Default to Hindi as per screenshots

  const t = (key) => translations[language][key] || key

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
