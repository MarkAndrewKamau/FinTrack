// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { fetchIncome, fetchExpenses, fetchBudgets } from '../api';
import Notifications from './Notifications';
import { Component as PieChart } from './PieChart'; // Adjust the import path if needed
import './Dashboard.css';

const Dashboard = () => {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomeData = await fetchIncome();
                const expensesData = await fetchExpenses();
                const budgetsData = await fetchBudgets();

                setIncome(incomeData);
                setExpenses(expensesData);
                setBudgets(budgetsData);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalIncome = (income || []).reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalExpenses = (expenses || []).reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const savings = totalIncome - totalExpenses;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Finance Tracker Dashboard</h1>
            </div>

            <div className="summary-section">
                <div className="summary-card">
                    <h2>Total Income</h2>
                    <p>${totalIncome.toFixed(2)}</p>
                </div>
                <div className="summary-card">
                    <h2>Total Expenses</h2>
                    <p>${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="summary-card">
                    <h2>Savings</h2>
                    <p>${savings.toFixed(2)}</p>
                </div>
            </div>

            <div className="budget-overview">
                <h2>Budget Overview</h2>
                <ul>
                    {budgets.map(budget => (
                        <li key={budget.id}>{budget.category}: ${budget.amount}</li>
                    ))}
                </ul>
            </div>

            <div className="chart-section">
                <h2>Visitors Overview</h2>
                <PieChartComponent />
            </div>

            <Notifications />
        </div>
    );
};

export default Dashboard;
