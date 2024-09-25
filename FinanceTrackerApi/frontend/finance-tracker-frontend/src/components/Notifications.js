import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api';
import './Notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (err) {
                setError("Failed to fetch notifications");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="notifications">
            <h2>Your Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id} className={notification.is_read ? "read" : "unread"}>
                        {notification.message} <span>{new Date(notification.created_at).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
