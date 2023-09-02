import React, { useState, useEffect } from 'react';

const ViewThreads = () => {
  const [threads, setThreads] = useState([]);

  const fetchThreads = async () => {
    try {
      const response = await fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchThreads().then(data => setThreads(data));
  }, []);

  return (
    <div>
      <h1>Thread List</h1>
      <ul>
        {threads.map((thread) => (
          <li className='App-link' key={thread.id}>{thread.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewThreads;
