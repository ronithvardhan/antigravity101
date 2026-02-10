import { useLanguage } from '../context/LanguageContext';
import { PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { useState } from 'react';

export default function Levels() {
    const { t } = useLanguage();
    const [expandedLevel, setExpandedLevel] = useState(null);

    const levels = [
        {
            id: 1, title: "Soil Preparation", description: "Learn how to prepare your land for the best yield.",
            status: "completed", lessons: 4, xp: 100,
            details: [
                "Lesson 1: Soil Types & Testing ✅",
                "Lesson 2: Land Preparation Techniques ✅",
                "Lesson 3: Organic Matter & Composting ✅",
                "Lesson 4: pH Balancing ✅"
            ]
        },
        {
            id: 2, title: "Seed Selection", description: "Choosing the right seeds for your climate.",
            status: "in-progress", progress: 60, lessons: 3, xp: 150,
            details: [
                "Lesson 1: Seed Varieties & Climate ✅",
                "Lesson 2: Hybrid vs. Traditional Seeds 🔄 In Progress",
                "Lesson 3: Seed Treatment 🔒 Locked"
            ]
        },
        {
            id: 3, title: "Irrigation Basics", description: "Water management techniques for efficiency.",
            status: "locked", lessons: 5, xp: 200,
            details: ["Complete 'Seed Selection' to unlock this level"]
        },
        {
            id: 4, title: "Pest Control", description: "Identifying and managing common pests naturally.",
            status: "locked", lessons: 6, xp: 300,
            details: ["Complete 'Irrigation Basics' to unlock this level"]
        },
    ];

    const handleLevelClick = (level) => {
        if (level.status === 'locked') return;
        setExpandedLevel(expandedLevel === level.id ? null : level.id);
    };

    return (
        <div className="space-y-6">
            <div className="flex-between">
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <h1>{t('levels')}</h1>
                </div>
                <span className="badge badge-success">Level 2 Farmer</span>
            </div>

            <div className="space-y-4">
                {levels.map((level) => (
                    <div
                        key={level.id}
                        className="card"
                        style={{ opacity: level.status === 'locked' ? 0.6 : 1, cursor: level.status === 'locked' ? 'not-allowed' : 'pointer' }}
                        onClick={() => handleLevelClick(level)}
                    >
                        <div className="level-card">
                            <div className={`level-icon ${level.status}`}>
                                {level.status === 'completed' ? <CheckCircle size={28} /> :
                                    level.status === 'locked' ? <Lock size={28} /> :
                                        <PlayCircle size={28} />}
                            </div>
                            <div className="level-info">
                                <h3>
                                    {level.title}
                                    {level.status === 'in-progress' && <span className="badge badge-warning">In Progress</span>}
                                    {level.status === 'completed' && <span className="badge badge-success">Completed</span>}
                                </h3>
                                <p>{level.description}</p>
                                {level.status === 'in-progress' && (
                                    <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
                                        <div className="progress-bar-fill" style={{ width: `${level.progress}%` }} />
                                    </div>
                                )}
                            </div>
                            <div className="level-xp">{level.xp} XP</div>
                        </div>

                        {expandedLevel === level.id && (
                            <div className="card-content" style={{ borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                                <div className="space-y-4">
                                    <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>📚 Lessons</h4>
                                    {level.details.map((lesson, i) => (
                                        <div key={i} style={{ padding: '0.5rem 0', fontSize: '0.9rem', borderBottom: i < level.details.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                                            {lesson}
                                        </div>
                                    ))}
                                    {level.status === 'in-progress' && (
                                        <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); alert('Continuing lesson: Hybrid vs. Traditional Seeds'); }}>
                                            ▶ Continue Lesson
                                        </button>
                                    )}
                                    {level.status === 'completed' && (
                                        <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); alert('Reviewing completed lessons for Soil Preparation'); }}>
                                            🔄 Review Lessons
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
