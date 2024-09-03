import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 Finance Tracker. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;