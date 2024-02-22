import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BitcoinDataFetcher from "./components/bitap/bitap"
import BitcoinTransactionCharts from "./components/bitap/transactions"

function App() {
  return (
    <div style={{marginBottom:'0'}}>
     <Router>
      <Routes>
       <Route path="/:address" element={<BitcoinDataFetcher />} />  
       <Route path="/" element={<BitcoinTransactionCharts />} />  
     </Routes>
    </Router>
     </div>
  );
}

export default App;
