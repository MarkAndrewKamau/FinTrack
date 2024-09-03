import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExpensesPage from './pages/ExpensesPage';
import IncomePage from './pages/IncomePage';
import BudgetPage from './pages/BudgetPage';
import ReportPage from './pages/ReportPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/expenses" component={ExpensesPage} />
                        <Route path="/income" component={IncomePage} />
                        <Route path="/budget" component={BudgetPage} />
                        <Route path="/reports" component={ReportPage} />
                        <Route path="/profile" component={ProfilePage} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
