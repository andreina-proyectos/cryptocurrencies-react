import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const endpoint = 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=40';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setCryptoData(data)
      })
  }, []);

  return (
    <div className="App">
      <header className="app__header">
        <h1 className="app__title">Criptocurrencies prices</h1>
      </header>
      <main className="app__main">
        <ul className="main__crypto-list">
          {cryptoData.map(crypto => {return (
            <li className="crypto-list__crypto">
              <h3 className="crypto__name">{crypto.name}</h3>
            </li>
          )})}
        </ul>
      </main>
    </div>
  );
}

export default App;
