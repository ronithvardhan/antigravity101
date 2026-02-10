import { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '0.75rem',
            color: 'white',
        }}>
            <ClockIcon size={24} />
            <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Current Time</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {hours}:{minutes}:{seconds}
                </div>
            </div>
        </div>
    );
}
