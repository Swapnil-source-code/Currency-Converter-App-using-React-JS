import './CurrencyConverter-style.css'
import currency_image from '../assets/images/currency-img.png'
import currency_code from '../assets/currency-code.js'
import { useState, useEffect } from 'react'


const CurrencyConverter = () => {
  
  const api = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/USD`;

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setFromCurrency("USD");
    setToCurrency("INR");
  }, []);

  const convertCurrency = () => {
    if (amount.length !== 0) {
      fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
          let fromExchangeRate = data.conversion_rates[fromCurrency];
          let toExchangeRate = data.conversion_rates[toCurrency];

          const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
          setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
        })
        .catch(() => {
          setResult("Error fetching exchange rates");
        });
    } else {
      alert("Please fill the Amount");
    }
  };


  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="app-details">
            <img src={currency_image} className="app-icon" alt="currency-image" />
            <h1 className="app-title">Currency Converter</h1>
          </div>
          
          <label htmlFor="amount">Amount :</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            defaultValue={100}
            placeholder='enter your amount'
          />

          <div className="dropdowns">
            <select id="from-currency-select" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currency_code.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
            </select>

            <select id="to-currency-select" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currency_code.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          </div>

          <button className="convert-button" onClick={convertCurrency}>Convert</button>
          <p className="result">{result}</p>

        </div>
      </div>
    </>
  )
}

export default CurrencyConverter