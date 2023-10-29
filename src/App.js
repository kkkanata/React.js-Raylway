import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewThreads from './components/viewThreads';
import CreateThread from './components/createThread';
import GoToCreateThreadButton from './components/goToCreateThreadButton';
import ListOfPostsWithinTheThread from './components/listOfPostsWithinTheThread';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      threadTitle: null,
    };
  }

    // コールバック関数
    setThreadsIdandTitle = (threadTitle) => {
      console.log(this.state);
      this.setState({ threadTitle });
    }

  render(){
    return ( 
      <Router>
        <div className='App'>
          <h1 className='inline-tag'>掲示板</h1>
          <GoToCreateThreadButton className='inline-tag' />
          <Routes>
            <Route path="/" element={<ViewThreads setThreadsIdandTitle={this.setThreadsIdandTitle} />} />
            <Route path="/thread/new" element={<CreateThread />} />
            <Route path="/thread/:threadId" element={<ListOfPostsWithinTheThread threadTitle={this.state.threadTitle}/> } />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
