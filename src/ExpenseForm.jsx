import { useState, useEffect, useRef } from "react";
export default function ExpenseForm() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

// total amount of expenses calculation using reduce method of an array
  const total = expenses.reduce((sum, expense) => sum + expense.amount,0);

  const titleRef = useRef(null);

// local storage saving as an string
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  //adding expenses
  const addExpenses = (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("Please enter full data");

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");

    //cursor auto set to title input field after adding expense
    titleRef.current.focus();
  };
   
  //deleting expense using js filter method of array
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="app">
      <div className="card">
        <h2>💰 Expense Tracker</h2>

        <form onSubmit={addExpenses} className="form">
          <input  ref={titleRef} type="text" placeholder="Expense title"
            value={title} onChange={(e) => setTitle(e.target.value)}/>

          <input type="number" placeholder="Amount ($)"
            value={amount} onChange={(e) => setAmount(e.target.value)}/>

          <button type="submit">Add</button>
        </form>

        <div className="total">
          Total: <span>${total.toFixed(2)}</span>
        </div>
         {/* terinary operator for checking is there any previous content or not */}
        {expenses.length === 0 ? <p>No Expense Yet</p> : (<ul className="list">  
          {expenses.map((expense) => (
            <li key={expense.id} className="list-item">
              <div><strong>{expense.title}</strong><p>${expense.amount}</p></div>
              {/* delete button that target expense it to delete uniquely */}
              <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>✕</button>
            </li>
          ))}
        </ul>) }
        
      </div>
    </div>
  );
}