import { useLanguage } from '../context/LanguageContext';
import { User, Award, Zap, TrendingUp } from 'lucide-react';

export default function Profile() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="page-header">
                <h1>{t('profile')}</h1>
            </div>

            <div className="grid-3">
                {/* User Info */}
                <div className="card" style={{ gridColumn: 'span 1' }}>
                    <div className="card-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem' }}>
                        <div className="profile-avatar">
                            <User size={40} color="white" />
                        </div>
                        <h2 className="font-bold text-xl" style={{ marginTop: '1rem' }}>Ronit Farmer</h2>
                        <p className="text-sm" style={{ color: '#64748b', marginTop: '0.25rem' }}>Joined Jan 2026</p>
                        <span className="badge badge-primary" style={{ marginTop: '0.75rem' }}>Level 5 Master</span>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="grid-2">
                        <div className="card">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <div className="stat-label">{t('xp_points')}</div>
                                    <div className="stat-value">1,250</div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#fecaca', color: '#dc2626' }}>
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <div className="stat-label">{t('day_streak')}</div>
                                    <div className="stat-value">12 Days</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title"><Award size={18} style={{ color: '#10b981' }} /> {t('achievements')}</div>
                        </div>
                        <div className="card-content">
                            <div className="grid-4">
                                {['Early Bird 🌅', 'Quiz Master 🧠', 'Green Thumb 🌿', 'Community Hero 🤝'].map((badge, i) => (
                                    <div key={i} className="achievement-tile">
                                        <div className="achievement-icon">
                                            <Award size={22} />
                                        </div>
                                        <span className="text-sm font-medium">{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
