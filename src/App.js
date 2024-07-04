import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
    return (
      <div style={{overflowX:"hidden"}}>
        <Header />
        <div>
          <AppRouter />
        </div>
        <Footer/>
      </div>
    );
}

export default App;