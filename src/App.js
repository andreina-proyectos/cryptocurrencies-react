import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import cryptoLogo from  '../node_modules/cryptocurrency-icons/svg/color/kmd.svg';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
});


function App() {
  const classes = useStyles();
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
              <Card className={classes.card}>
                <img src={cryptoLogo} alt="" className="crypto__logo"/>
                <CardContent>
                  <h3 className="crypto__name">{crypto.name}</h3>
                  <p className="crypto__symbol">{crypto.symbol}</p>
                  <p className="crypto__price-usd">$  {crypto.price_usd}</p>
                  <p className="crypto__price-btc">₿  {crypto.price_btc}</p>
                  <p className="crypto__market-cap">Market cap: $ {crypto.market_cap_usd}</p>
                  <p className="crypto__percent1h">Change 1h: {crypto.percent_change_1h} %</p>
                  <p className="crypto__percent24h">Change 24h: {crypto.percent_change_24h} %</p>    
                </CardContent>
              </Card>





            </li>
          )})}
        </ul>
      </main>
    </div>
  );
}

export default App;
