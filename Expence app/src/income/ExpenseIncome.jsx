
import Expense from '../Components/Expenses/Expense'; 
import '../Styles/ExpenseIncome.css'; 

function ExpenseIncome() {
  return (
    <div className="expense-income-page">
      <div className="form">
        <Expense />
      </div>
    </div>
  );
}

export default ExpenseIncome;

