import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Finance Tracker</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/expenses" className="hover:underline">Expenses</Link></li>
          <li><Link to="/income" className="hover:underline">Income</Link></li>
          <li><Link to="/budget" className="hover:underline">Budget</Link></li>
          <li><Link to="/report" className="hover:underline">Reports</Link></li>
          <li><Link to="/profile" className="hover:underline">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;