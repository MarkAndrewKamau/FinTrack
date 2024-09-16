import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import ExpensesPage from './pages/ExpensesPage';
import IncomePage from './pages/IncomePage';
import BudgetPage from './pages/BudgetPage';
import ReportPage from './pages/ReportPage';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Signup />} /> {/* Set Signup as default route */}
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} /> {/* Add HomePage as /home route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
