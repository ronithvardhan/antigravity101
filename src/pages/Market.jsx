import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Market() {
    const { t } = useLanguage();
    const [selectedCrop, setSelectedCrop] = useState('All');

    const marketData = [
        { id: 1, crop: 'Wheat (Gehu)', price: '₹2,125', unit: '/Quintal', trend: 'up', change: '+₹15', location: 'Mandi Smithi, Punjab' },
        { id: 2, crop: 'Rice (Chawal)', price: '₹3,200', unit: '/Quintal', trend: 'down', change: '-₹10', location: 'Karnal, Haryana' },
        { id: 3, crop: 'Mustard (Sarson)', price: '₹5,450', unit: '/Quintal', trend: 'stable', change: '₹0', location: 'Jaipur, Rajasthan' },
        { id: 4, crop: 'Cotton (Kapas)', price: '₹6,100', unit: '/Quintal', trend: 'up', change: '+₹50', location: 'Akola, Maharashtra' },
        { id: 5, crop: 'Potato (Aloo)', price: '₹850', unit: '/Quintal', trend: 'up', change: '+₹20', location: 'Agra, UP' },
        { id: 6, crop: 'Tomato (Tamatar)', price: '₹1,200', unit: '/Quintal', trend: 'down', change: '-₹40', location: 'Kolar, Karnataka' },
    ];

    const filters = ['All', 'Wheat', 'Rice', 'Mustard', 'Cotton'];
    const filteredData = selectedCrop === 'All' ? marketData : marketData.filter(item => item.crop.includes(selectedCrop));

    return (
        <div className="space-y-6">
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <h1>{t('market')}</h1>
                    <p>Real-time prices across major mandis</p>
                </div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <MapPin size={16} style={{ color: '#10b981' }} />
                    <select className="select-field">
                        <option>All India</option>
                        <option>Punjab</option>
                        <option>Haryana</option>
                        <option>Maharashtra</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {filters.map((crop) => (
                    <button
                        key={crop}
                        onClick={() => setSelectedCrop(crop)}
                        className={`chip ${selectedCrop === crop ? 'active' : ''}`}
                    >
                        {crop}
                    </button>
                ))}
            </div>

            <div className="grid-3">
                {filteredData.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-content">
                            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                                <div>
                                    <div className="font-bold">{item.crop}</div>
                                    <div className="market-location">
                                        <MapPin size={12} /> {item.location}
                                    </div>
                                </div>
                                <span className={`badge ${item.trend === 'up' ? 'badge-success' : item.trend === 'down' ? 'badge-warning' : 'badge-default'}`}>
                                    {item.trend === 'up' ? <TrendingUp size={12} /> :
                                        item.trend === 'down' ? <TrendingDown size={12} /> :
                                            <Minus size={12} />}
                                    {item.trend === 'up' ? ' Rising' : item.trend === 'down' ? ' Falling' : ' Stable'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                <span className="market-price">{item.price}</span>
                                <span className="market-unit">{item.unit}</span>
                            </div>
                            <div className={`text-sm font-medium ${item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-stable'}`} style={{ marginTop: '0.5rem' }}>
                                {item.change} since yesterday
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
