import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Levels from './pages/Levels';
import Videos from './pages/Videos';
import Market from './pages/Market';
import Community from './pages/Community';
import Profile from './pages/Profile';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="levels" element={<Levels />} />
            <Route path="videos" element={<Videos />} />
            <Route path="market" element={<Market />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}
