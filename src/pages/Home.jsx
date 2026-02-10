import { useLanguage } from '../context/LanguageContext';
import { Sun, CloudRain, Wind, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Clock from '../components/ui/Clock';

export default function Home() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Fertilizer Application for Wheat', done: false },
        { id: 2, text: 'Irrigation Schedule Check', done: false },
        { id: 3, text: 'Soil Testing Sample Collection', done: false },
    ]);
    const [showCropDetail, setShowCropDetail] = useState(null);

    const toggleTask = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    return (
        <div className="space-y-6">
            {/* Clock */}
            <Clock />

            {/* Welcome Section */}
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <h1>{t('welcome')}, Kisan! 🌾</h1>
                    <p>Let's take care of your crops today.</p>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/levels')}>
                    {t('continue_learning')} →
                </button>
            </div>

            {/* Weather Grid */}
            <div className="grid-4">
                <div className="weather-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                    <div>
                        <div className="weather-label">Temperature</div>
                        <div className="weather-value">28°C</div>
                    </div>
                    <Sun className="weather-icon" style={{ color: '#fde68a' }} />
                </div>
                <div className="weather-card" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                    <div>
                        <div className="weather-label">Humidity</div>
                        <div className="weather-value">65%</div>
                    </div>
                    <Droplets className="weather-icon" />
                </div>
                <div className="weather-card" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                    <div>
                        <div className="weather-label">Wind Speed</div>
                        <div className="weather-value">12 km/h</div>
                    </div>
                    <Wind className="weather-icon" />
                </div>
                <div className="weather-card" style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}>
                    <div>
                        <div className="weather-label">Rainfall</div>
                        <div className="weather-value">2 mm</div>
                    </div>
                    <CloudRain className="weather-icon" />
                </div>
            </div>

            {/* Crop Health & Tasks */}
            <div className="grid-2">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">🌱 Crop Health Status</div>
                    </div>
                    <div className="card-content space-y-4">
                        <div className="crop-status-item healthy">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className="crop-dot green" />
                                <div>
                                    <div style={{ fontWeight: 600 }}>Wheat (Rabi)</div>
                                    <div className="text-sm" style={{ color: '#64748b' }}>Growth Stage: Flowering</div>
                                </div>
                            </div>
                            <button className="btn btn-outline btn-sm" onClick={() => setShowCropDetail(showCropDetail === 'wheat' ? null : 'wheat')}>
                                {showCropDetail === 'wheat' ? 'Close' : 'Details'}
                            </button>
                        </div>
                        {showCropDetail === 'wheat' && (
                            <div className="crop-detail-panel">
                                <p><strong>Variety:</strong> HD-2967</p>
                                <p><strong>Planted:</strong> Nov 15, 2025</p>
                                <p><strong>Expected Harvest:</strong> Mar 20, 2026</p>
                                <p><strong>Health:</strong> Good - No pests detected</p>
                                <p><strong>Next Action:</strong> Apply foliar spray in 3 days</p>
                            </div>
                        )}

                        <div className="crop-status-item warning">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className="crop-dot yellow" />
                                <div>
                                    <div style={{ fontWeight: 600 }}>Mustard</div>
                                    <div className="text-sm" style={{ color: '#64748b' }}>Alert: Pest Check Required</div>
                                </div>
                            </div>
                            <button className="btn btn-outline btn-sm" onClick={() => setShowCropDetail(showCropDetail === 'mustard' ? null : 'mustard')}>
                                {showCropDetail === 'mustard' ? 'Close' : 'Check'}
                            </button>
                        </div>
                        {showCropDetail === 'mustard' && (
                            <div className="crop-detail-panel">
                                <p><strong>Variety:</strong> Pusa Bold</p>
                                <p><strong>Planted:</strong> Oct 25, 2025</p>
                                <p><strong>Issue:</strong> Aphid infestation detected on lower leaves</p>
                                <p><strong>Recommended:</strong> Apply Neem oil spray immediately</p>
                                <p><strong>Severity:</strong> Medium - Act within 2 days</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="card-title">📅 Upcoming Tasks</div>
                    </div>
                    <div className="card-content">
                        {tasks.map((task) => (
                            <div key={task.id} className="task-item" onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    className="task-checkbox"
                                    checked={task.done}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span className="task-label" style={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.5 : 1 }}>
                                    {task.text}
                                </span>
                            </div>
                        ))}
                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                            ✅ {tasks.filter(t => t.done).length}/{tasks.length} completed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
