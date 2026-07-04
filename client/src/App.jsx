import { useState } from "react";

function App() {
  const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [transactions, setTransactions] = useState([]);
const [balance, setBalance] = useState(0);
const addIncome = () => {
  if (!description || !amount) return;

  const newTransaction = {
    id: Date.now(),
    description,
    amount: Number(amount),
    type: "Income",
  };

  setTransactions([...transactions, newTransaction]);
  setBalance(balance + Number(amount));

  setDescription("");
  setAmount("");
};

const addExpense = () => {
  if (!description || !amount) return;

  const newTransaction = {
    id: Date.now(),
    description,
    amount: Number(amount),
    type: "Expense",
  };

  setTransactions([...transactions, newTransaction]);
  setBalance(balance - Number(amount));

  setDescription("");
  setAmount("");
};
  return (
    <div style={styles.container}>
      <h1>💰 Expense Tracker</h1>

      <div style={styles.card}>
        <h2>Current Balance</h2>
        <h1>₹{balance}</h1>

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <div style={styles.buttons}>
          <button style={styles.income} onClick={addIncome}>
           ➕ Add Income
           </button>
          <button style={styles.expense} onClick={addExpense}>
        ➖ Add Expense
           </button>
        </div>

        <h3>Transactions</h3>

{transactions.length === 0 ? (
  <p>No transactions yet.</p>
) : (
  <ul style={styles.list}>
    {transactions.map((item) => (
      <li
        key={item.id}
        style={{
          ...styles.listItem,
          borderLeft:
            item.type === "Income"
              ? "5px solid green"
              : "5px solid red",
        }}
      >
        <div>
          <strong>{item.description}</strong>
          <br />
          ₹{item.amount}
        </div>

        <button
          style={styles.deleteBtn}
          onClick={() => {
            setTransactions(
              transactions.filter((t) => t.id !== item.id)
            );

            if (item.type === "Income")
              setBalance(balance - item.amount);
            else
              setBalance(balance + item.amount);
          }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
)}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  income: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  expense: {
    background: "red",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  list: {
  listStyle: "none",
  padding: 0,
  marginTop: "20px",
},

listItem: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f4f4f4",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "6px",
},

deleteBtn: {
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: "5px",
},
};

export default App;