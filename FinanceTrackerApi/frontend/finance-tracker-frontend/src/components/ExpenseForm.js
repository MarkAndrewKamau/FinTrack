import React, { useState } from 'react';

const ExpenseForm = ({ onSaveExpense }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        const expenseData = {
            title,
            amount: +amount,
            date: new Date(date),
        };
        onSaveExpense(expenseData);
        setTitle('');
        setAmount('');
        setDate('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-control">
                <label>Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-control">
                <label>Amount</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-control">
                <label>Date</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;
