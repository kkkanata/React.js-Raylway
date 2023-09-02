import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewThreads from './components/viewThreads';
import GoToCreateThreadButton from './components/goToCreateThreadButton';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <h1 className='inline-tag'>掲示板</h1>
        <GoToCreateThreadButton className='inline-tag' />
        <Routes>
          <Route path="/" element={<ViewThreads />} />
          {/* 他のルートもここに追加できます */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
