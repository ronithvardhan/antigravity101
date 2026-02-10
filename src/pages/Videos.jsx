import { useLanguage } from '../context/LanguageContext';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Videos() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [playingVideo, setPlayingVideo] = useState(null);

    const videos = [
        { id: 1, title: 'Organic Farming - Full Course', thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=225&fit=crop', duration: '12:30', category: 'Organic', youtubeId: 'mMCMTViLKhc' },
        { id: 2, title: 'Modern Irrigation Techniques', thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=225&fit=crop', duration: '08:45', category: 'Irrigation', youtubeId: 'cWC5x-sKGlE' },
        { id: 3, title: 'Soil Health & Testing Guide', thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=225&fit=crop', duration: '15:10', category: 'Soil', youtubeId: '7fMSGhQ8bKg' },
        { id: 4, title: 'Natural Pest Management', thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=225&fit=crop', duration: '10:20', category: 'Pest Control', youtubeId: 'oisFCsgbMEU' },
        { id: 5, title: 'Crop Rotation Explained', thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=225&fit=crop', duration: '11:00', category: 'Planning', youtubeId: '8DnKOc4t8po' },
        { id: 6, title: 'Harvesting Best Practices', thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=225&fit=crop', duration: '09:30', category: 'Harvesting', youtubeId: 'GYgQ63esFsM' },
    ];

    const filteredVideos = videos.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Video Player Modal */}
            {playingVideo && (
                <div className="modal-overlay" onClick={() => setPlayingVideo(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px' }}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 700 }}>{playingVideo.title}</h3>
                            <button className="btn btn-ghost" onClick={() => setPlayingVideo(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1`}
                                title={playingVideo.title}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div style={{ padding: '1rem 0 0.5rem' }}>
                            <span className="badge badge-primary">{playingVideo.category}</span>
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>⏱ {playingVideo.duration}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <h1>{t('videos')}</h1>
                </div>
                <div className="search-wrapper" style={{ width: '100%', maxWidth: '360px' }}>
                    <Search />
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredVideos.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p style={{ fontSize: '1.1rem' }}>No videos found for "{searchTerm}"</p>
                    <button className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }} onClick={() => setSearchTerm('')}>
                        Clear Search
                    </button>
                </div>
            )}

            <div className="grid-3">
                {filteredVideos.map((video) => (
                    <div key={video.id} className="card" style={{ cursor: 'pointer' }} onClick={() => setPlayingVideo(video)}>
                        <div className="video-thumb">
                            <img src={video.thumbnail} alt={video.title} loading="lazy" />
                            <div className="video-duration">{video.duration}</div>
                            <div className="video-play-overlay">▶</div>
                        </div>
                        <div className="card-content">
                            <h3 className="font-semibold" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{video.title}</h3>
                            <span className="badge badge-default">{video.category}</span>
                            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '0.75rem' }} onClick={(e) => { e.stopPropagation(); setPlayingVideo(video); }}>
                                ▶ Watch Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
