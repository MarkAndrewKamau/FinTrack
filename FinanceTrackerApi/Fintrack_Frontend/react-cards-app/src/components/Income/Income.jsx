import React, { useState } from 'react';
import IncomeList from "./incomeList";
import IncomeForm from './incomeForm';

const Income = () => {
  const [incomes, setIncomes] = useState([]);

  const handleIncomeSubmit = (newIncome) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  return (
    <div>
      <IncomeList incomes={incomes} />
      <IncomeForm onSubmit={handleIncomeSubmit} />
    </div>
  );
}

export default Income;
