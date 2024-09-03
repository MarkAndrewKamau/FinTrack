import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/expenses">Expenses</Link></li>
                    <li><Link to="/income">Income</Link></li>
                    <li><Link to="/budget">Budget</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
