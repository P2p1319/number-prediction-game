import { useState } from "react";

const GAME_INTERVALS = ["30s", "1m", "5m", "15m"];
const NUMBERS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [balance, setBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(0);
  const [gameTime, setGameTime] = useState("30s");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function sendOTP() {
    setMessage("OTP sent to " + phone);
  }

  function verifyOTP() {
    setIsLoggedIn(true);
    setMessage("Logged in as user");
    if (phone === "9999999999") setIsAdmin(true);
  }

  function placeBet() {
    if (betAmount <= 0 || selectedNumber == null) {
      setMessage("Select number and enter amount.");
      return;
    }
    if (betAmount > balance) {
      setMessage("Not enough balance.");
      return;
    }

    setBalance(balance - betAmount);
    const winningNumber = Math.ceil(Math.random() * 10);
    if (selectedNumber === winningNumber) {
      const reward = betAmount * 9;
      setBalance(balance + reward);
      setMessage(`✅ You won! Number: ${winningNumber}`);
    } else {
      setMessage(`❌ You lost. Number: ${winningNumber}`);
    }
  }

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 300, margin: '50px auto' }}>
        <h2>Login with OTP</h2>
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button onClick={sendOTP}>Send OTP</button>
        <input placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={verifyOTP}>Verify</button>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div style={{ maxWidth: 500, margin: '50px auto' }}>
        <h1>Admin Panel</h1>
        <p>Welcome Admin ({phone})</p>
        <p>Set Winning Number (Coming soon)</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', textAlign: 'center' }}>
      <h1>Number Prediction Game</h1>
      <div>
        {NUMBERS.map((num) => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            style={{ margin: 5, padding: 10, backgroundColor: selectedNumber === num ? 'lightblue' : 'white' }}
          >
            {num}
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Bet Amount"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
      />
      <select value={gameTime} onChange={(e) => setGameTime(e.target.value)}>
        {GAME_INTERVALS.map((t) => <option key={t}>{t}</option>)}
      </select>
      <button onClick={placeBet}>Place Bet</button>
      <div>
        <p>Balance: {balance} coins</p>
        <p>{message}</p>
      </div>
    </div>
  );
}