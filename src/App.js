import React from 'react';
import './App.css';
import AppRouter from './AppRouter';  // 경로가 정확한지 확인하세요
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div style={{overflowX:"hidden"}}>
    <Header />

    <div>
      여기는 본문!!!
      입니당
    </div>

    <Footer/>
    </div>
  );
}

export default App;