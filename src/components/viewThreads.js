import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewThreads = ({ setThreadsId }) => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate(); // navigate 関数を取得

  const threadClick = (threadId) => {
    setThreadsId(threadId);
    navigate(`/thread/${threadId}`); // navigate を使用してリンク
  }

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
          <li className='App-link' key={thread.id}>
            <button onClick={() => threadClick(thread.id)}>{thread.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewThreads;
