import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewThreads from './components/viewThreads';
import CreateThread from './components/createThread';
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
          <Route path="/thread/new" element={<CreateThread />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
