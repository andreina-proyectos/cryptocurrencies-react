import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import cryptoJson from './cryptocurrency-icons/manifest.json';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  }
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

  const getCrytoLogo = (symbolCurrency) => {
    const defaultCryptoLogo = 'http://www.myiconfinder.com/uploads/iconsets/ad922adbaf0350613b28cec297798d40-loading.png';
    let cryptoLogoImage;
    try{
      cryptoLogoImage = require(`./cryptocurrency-icons/svg/color/${symbolCurrency.toLowerCase()}.svg`)
    }
    catch (error) {
      cryptoLogoImage = defaultCryptoLogo;
    }
    return cryptoLogoImage;
 }

 const getCryptoColor = (symbolCurrency) => {
  let cryptoFounded = cryptoJson.find(function(element){
    return element.symbol.toLowerCase() === symbolCurrency.toLowerCase();
  })
  const halfOpacity = "99";
  let colorWithLessOpacity = cryptoFounded? cryptoFounded.color+halfOpacity : "#2e3148"+halfOpacity;

  let colorWithoutLessOpacity = cryptoFounded? cryptoFounded.color : "#2e3148" 
  return ({colorWithLessOpacity, colorWithoutLessOpacity}) ;
 }

  return (
    <div className="App">
      <header className="app__header">
        <h1 className="app__title">Criptocurrencies prices</h1>
      </header>
      <main className="app__main">
        <ul className="main__crypto-list">
          {cryptoData.map(crypto => {
            const cryptoColor = getCryptoColor(crypto.symbol);
           return (
            <li key={crypto.id} className="crypto-list__crypto">

              {/* <Card style={{"backgroundColor": getCryptoColor(crypto.symbol), filter: "alpha(opacity=60)"}} className={classes.card}> */}

              <Card style={{"background": `linear-gradient(170deg, ${cryptoColor.colorWithLessOpacity} 60%, ${cryptoColor.colorWithoutLessOpacity} 40%)`}} className={classes.card}>
                <CardContent>
                  <img src={getCrytoLogo(crypto.symbol)} alt="" className="crypto__logo" width="50"/>
                  <h3 className="crypto__name">{crypto.name}</h3>

                  <div
                    className="crypto__info-wrapper">
                    <p className="crypto__symbol">{crypto.symbol}</p>
                    <p className="crypto__price-usd">$  {crypto.price_usd}</p>
                    <p className="crypto__price-btc">₿  {crypto.price_btc}</p>
                    <p className="crypto__market-cap">Market cap: $ {crypto.market_cap_usd}</p>
                    <p className="crypto__percent1h">Change 1h: {crypto.percent_change_1h} %</p>
                    <p className="crypto__percent24h">Change 24h: {crypto.percent_change_24h} %</p> 
                  </div>

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
