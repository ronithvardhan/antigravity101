import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, ThumbsUp, Share2, Search, PlusCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function Community() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('All');
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPostText, setNewPostText] = useState('');
    const [expandedComments, setExpandedComments] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [posts, setPosts] = useState([
        {
            id: 1, author: 'Ramesh Kumar', role: 'Level 4 Farmer', time: '2 hours ago',
            content: 'My wheat crop is turning yellow at the tips. Is this normal for this season or should I be worried about nitrogen deficiency?',
            tags: ['Wheat', 'Crop Health'], likes: 24, color: '#6366f1', liked: false,
            comments: [
                { id: 101, author: 'Anita Singh', text: 'It could be nitrogen deficiency. Try applying urea at 50kg/hectare. I had the same issue last year.', time: '1 hour ago' },
                { id: 102, author: 'Dr. Patel', text: 'Check the lower leaves first. If they are yellow too, it is nitrogen. If only tips, it might be frost damage from cold nights.', time: '45 min ago' },
                { id: 103, author: 'Suresh Yadav', text: 'I am facing the same issue with my wheat in Haryana. Following this thread!', time: '30 min ago' },
                { id: 104, author: 'Meena Devi', text: 'Try foliar spray of 2% urea solution. It works faster than soil application.', time: '20 min ago' },
            ]
        },
        {
            id: 2, author: 'Anita Singh', role: 'Level 5 Expert', time: '5 hours ago',
            content: 'Just tried the new organic pesticide recipe from Level 3 module. Works wonders on Aphids! Highly recommend everyone to try it.',
            tags: ['Organic', 'Pest Control', 'Success'], likes: 156, color: '#10b981', liked: false,
            comments: [
                { id: 201, author: 'Ramesh Kumar', text: 'Which recipe exactly? The neem oil one or the garlic spray?', time: '4 hours ago' },
                { id: 202, author: 'Anita Singh', text: 'The neem oil + soap solution one. Mix 5ml neem oil with 2ml liquid soap in 1 liter water. Spray early morning.', time: '3 hours ago' },
                { id: 203, author: 'Vikram Patel', text: 'Does it work on whiteflies too? They are destroying my cotton crop.', time: '2 hours ago' },
            ]
        },
        {
            id: 3, author: 'Vikram Patel', role: 'Level 2 Farmer', time: '1 day ago',
            content: 'What is the best market price for Cotton in Gujarat right now? Mandi prices seem to be fluctuating a lot.',
            tags: ['Market', 'Cotton'], likes: 12, color: '#f59e0b', liked: false,
            comments: [
                { id: 301, author: 'Market Expert', text: 'Current best price is ₹6,200/quintal at Rajkot Mandi. Prices are expected to rise next week.', time: '20 hours ago' },
                { id: 302, author: 'Sunita Bai', text: 'I sold at ₹6,050 in Ahmedabad last week. Should have waited!', time: '18 hours ago' },
            ]
        }
    ]);

    const toggleLike = (id) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
        ));
    };

    const addComment = (postId) => {
        if (!newComment.trim()) return;
        setPosts(prev => prev.map(p =>
            p.id === postId ? {
                ...p,
                comments: [...p.comments, {
                    id: Date.now(),
                    author: 'You',
                    text: newComment,
                    time: 'Just now'
                }]
            } : p
        ));
        setNewComment('');
    };

    const addPost = () => {
        if (!newPostText.trim()) return;
        const newPost = {
            id: Date.now(),
            author: 'You',
            role: 'Level 2 Farmer',
            time: 'Just now',
            content: newPostText,
            tags: ['Question'],
            likes: 0,
            color: '#ec4899',
            liked: false,
            comments: [],
        };
        setPosts([newPost, ...posts]);
        setNewPostText('');
        setShowNewPost(false);
    };

    const filteredPosts = posts.filter(p =>
        p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <h1>{t('community')}</h1>
                    <p>Connect, share, and learn from fellow farmers</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowNewPost(true)}>
                    <PlusCircle size={18} /> Ask Question
                </button>
            </div>

            {/* New Post Modal */}
            {showNewPost && (
                <div className="modal-overlay" onClick={() => setShowNewPost(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 style={{ fontWeight: 700 }}>Ask a Question</h3>
                            <button className="btn btn-ghost" onClick={() => setShowNewPost(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <textarea
                            placeholder="What's your farming question? Be specific..."
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                            className="textarea-field"
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-outline" onClick={() => setShowNewPost(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={addPost} disabled={!newPostText.trim()}>Post Question</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div className="search-wrapper" style={{ flex: 1, minWidth: '240px' }}>
                    <Search />
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['All', 'Popular', 'Recent', 'My Posts'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`chip ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4" style={{ maxWidth: '800px' }}>
                {filteredPosts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <p>No discussions found.</p>
                    </div>
                )}
                {filteredPosts.map((post) => (
                    <div key={post.id} className="card">
                        <div className="post-card">
                            <div className="post-author">
                                <div className="post-avatar" style={{ background: post.color }}>
                                    {post.author[0]}
                                </div>
                                <div className="post-author-info">
                                    <h4>{post.author}</h4>
                                    <span>{post.role} · {post.time}</span>
                                </div>
                                <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => {
                                    navigator.clipboard?.writeText(post.content);
                                    alert('Post copied to clipboard!');
                                }}>
                                    <Share2 size={16} />
                                </button>
                            </div>

                            <div className="post-content">{post.content}</div>

                            <div className="post-tags">
                                {post.tags.map((tag) => <span key={tag} className="post-tag">#{tag}</span>)}
                            </div>

                            <div className="post-actions">
                                <button
                                    className="post-action-btn"
                                    onClick={() => toggleLike(post.id)}
                                    style={{ color: post.liked ? '#10b981' : undefined, fontWeight: post.liked ? 700 : 500 }}
                                >
                                    <ThumbsUp size={16} style={{ fill: post.liked ? '#10b981' : 'none' }} /> {post.likes}
                                </button>
                                <button
                                    className="post-action-btn"
                                    onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
                                    style={{ color: expandedComments === post.id ? '#10b981' : undefined }}
                                >
                                    <MessageSquare size={16} /> {post.comments.length} Comments
                                </button>
                            </div>

                            {/* Comments Section */}
                            {expandedComments === post.id && (
                                <div className="comments-section">
                                    {post.comments.map((comment) => (
                                        <div key={comment.id} className="comment-item">
                                            <div className="comment-avatar" style={{ background: comment.author === 'You' ? '#ec4899' : '#64748b' }}>
                                                {comment.author[0]}
                                            </div>
                                            <div className="comment-body">
                                                <div className="comment-meta">
                                                    <span className="comment-author">{comment.author}</span>
                                                    <span className="comment-time">{comment.time}</span>
                                                </div>
                                                <p className="comment-text">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Comment */}
                                    <div className="comment-input-row">
                                        <input
                                            type="text"
                                            placeholder="Write a reply..."
                                            className="comment-input"
                                            value={expandedComments === post.id ? newComment : ''}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') addComment(post.id); }}
                                        />
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => addComment(post.id)}
                                            disabled={!newComment.trim()}
                                        >
                                            <Send size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
