import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Layers, Video, User, Moon, Sun, Menu, X, Globe, TrendingUp, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

export default function Layout() {
    const { theme, toggleTheme } = useTheme();
    const { t, language, toggleLanguage } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'home' },
        { path: '/levels', icon: Layers, label: 'levels' },
        { path: '/videos', icon: Video, label: 'videos' },
        { path: '/market', icon: TrendingUp, label: 'market' },
        { path: '/community', icon: Users, label: 'community' },
        { path: '/profile', icon: User, label: 'profile' },
    ];

    return (
        <div className={`app-layout ${theme}`}>
            {/* Mobile Header */}
            <header className="mobile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={22} />
                    </button>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>🌾 EduKhet</span>
                </div>
                <div className="mobile-header-actions">
                    <button className="btn btn-ghost" onClick={toggleLanguage}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{language === 'en' ? 'हि' : 'EN'}</span>
                    </button>
                    <button className="btn btn-ghost" onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="logo-icon">🌾</div>
                    <h1>EduKhet</h1>
                    <button
                        className="btn btn-ghost"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.6)', display: isSidebarOpen ? 'flex' : 'none' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={20} />
                                <span>{t(item.label)}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={toggleLanguage}>
                        <Globe size={14} />
                        {language === 'en' ? 'English' : 'हिंदी'}
                    </button>
                    <button onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <main className="main-content">
                <div className="main-content-inner">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
